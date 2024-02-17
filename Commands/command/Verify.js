const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const env = require('./../../env.json');
const GF = require('../../Function/fetch')
const {TestErrorMassage, ErrorMassage} = require("../../Function/ErrorMassage")
const {SaveData,CheckDupeData} = require('../../Function/GetDB')

lock = false;
reason = `內部調整，暫時不開放更多人驗證`


module.exports = {
    data:
        new SlashCommandBuilder()
        .setName('verify')
        .setDescription('驗證')
        .addSubcommand(sub=>
            sub
                .setName('hypixel')
                .setDescription('驗證Hypixel 帳號')
                .addStringOption(op=>op
                    .setName('minecraft_id')
                    .setDescription('minecraft id')
                    .setRequired(true)
                )
                .addStringOption(op=>op
                    .setName('hypixel_api')
                    .setDescription('Hypixel API')
                    .setRequired(true)
                )

        )
        .addSubcommand(sub=>sub
            .setName('status')
            .setDescription('查詢該服務狀態')
        )
        .addSubcommand(sub=>
            sub
                .setName("admin_verify")
                .setDescription("管理員驗證")
                .addUserOption(op=>
                    op
                        .setName("verify_user")
                        .setDescription("要驗證的成員")
                        .setRequired(true)
                )
                .addStringOption(op=>
                    op
                        .setName("ign")
                        .setDescription("Minecraft id")
                        .setRequired(true)
                )
                .addStringOption(op=>
                    op
                        .setName("api")
                        .setDescription("api")
                        .setRequired(true)
                )
        )





    ,
    //1193120643500228679 驗證頻道
    async execute(client,interaction){
        try{


            if(interaction.bot){
                interaction.reply({content:`機器人無法使用該指令`,ephemeral:true})
                return;
            }


            if(interaction.options.getSubcommand()==="admin_verify"){

                if(!interaction.member._roles.includes("1193038800918687806")) { interaction.reply({content:"你沒有權限",ephemeral:true}); return;}

                
                const api = interaction.options.getString("api")
                const member = interaction.options.getMember("verify_user")
                const ign = interaction.options.getString("ign")
                await interaction.reply({content: "查詢中...",ephemeral:true});
                const MinecratUUID = `https://api.mojang.com/users/profiles/minecraft/${ign}`;
                const Uuid = await GF.GetFetch(MinecratUUID);

                const HypixelApiLink = `https://api.hypixel.net/player?uuid=${Uuid.id}&key=${api}`
                const status = await GF.GetFetch(HypixelApiLink);

                const SocialMedia = status.player?.socialMedia?.links?.DISCORD;
                const verify = new EmbedBuilder()
                    .setTitle("查詢狀態")
                    .setDescription("手動查詢")
                    .addFields(
                        {name:"ign" , value : ign},
                        {name : "discord id" , value :member.user.username? member.user.username:"N"},
                        {name:"Hypixel 綁定狀態" ,value : SocialMedia?SocialMedia:"N"},
                        {name:"是否一致",value: SocialMedia === member.user.username?"Y":"N"}
                    )
                    await interaction.editReply({embeds:[verify]});

                return;
            }

            if(interaction.channel.id !== env.VerifyChannel) {
                await interaction.reply({content:`此頻道無法使用該指令請前往 <#${env.VerifyChannel}>`, ephemeral: true });
                return;
            }


            if(interaction.options.getSubcommand() === "status"){
                interaction.reply({content:'目前狀態 : Close ',ephemeral:true });
            }
            else if(interaction.options.getSubcommand() === "hypixel"){


                let API = interaction.options.getString('hypixel_api');
                if(API === "IN") API = env.hyapi;
                await interaction.reply({content:`讀取 ${interaction.options.getString('minecraft_id')} 的 Hypixel 資料中.... \n API: 隱藏`,ephemeral:true})


                //https://api.mojang.com/users/profiles/minecraft/o_in
                const MinecraftUuid = `https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString('minecraft_id')}`;
                const Uuid = await GF.GetFetch(MinecraftUuid);

                const HypixelApiLink = `https://api.hypixel.net/player?uuid=${Uuid.id}&key=${API}`

                const status = await GF.GetFetch(HypixelApiLink);



                if(status.player?.socialMedia?.links?.DISCORD === undefined||status.success !== true || status.player?.socialMedia === undefined ||  status.player === null || Uuid.id === undefined  ){  //讀取失敗
                    //console.log("讀取失敗")
                    const Failed = new EmbedBuilder()
                        .setTitle(`驗證失敗`)
                        .setDescription(`原因如下，如不清楚截圖此給管理員`)
                    	.addFields(
                            {name:`Hypixel API`,value:status.success?"讀取成功":status.cause},
                            {name:`Hypixel Inf` ,value:status.player?"Y":"該帳號沒進過Hypixel"},
                            {name:`Minecraft`,value:Uuid.errorMessage?Uuid.errorMessage:Uuid.id},
                            {name:`socialMedia` , value:status.player?status.player.socialMedia?status.player.socialMedia.links.DISCORD?status.player.socialMediastatus.player.socialMedia.links.DISCORD:"你沒有連接帳號":"你沒有連接discord帳號":"該帳號沒進過Hypixel"},

                        )
                    
                     await interaction.editReply({embeds:[Failed]});
                  //  await interaction.editReply({content:`讀取失敗\n Reason : \nHypixel : ${status.cause?status.cause:'讀取失敗'} \n Hypixel Inf ${status.player} \n Minecraft Uuid : ${Uuid.errorMessage?Uuid.errorMessage:Uuid.id}`})
                    return;
                }
				

                if(status.player.socialMedia.links.DISCORD !== interaction.user.username){
                    const Failed = new EmbedBuilder()
                        .setColor(0x009FF)
                        .setTitle(`驗證失敗`)
                        .setDescription(`原因 : Discord 與 Hypixel 綁定不一致`)
                        .addFields(
                            {name:`驗證狀態`,value:`失敗`},
                            {name:`API` ,value:`隱藏資訊`,inline:true},
                            {name:`UUID`,value:`${Uuid.id?Uuid.id:'uuid讀取失敗'}`,inline:true},
                            {name:`綁定狀態` , value:' '},
                            {name:`Hypixel 綁定狀態` , value:status.player.socialMedia.links.DISCORD?status.player.socialMedia.links.DISCORD:'N',inline:true},
                            {name:'Discord ID',value:interaction.user.username?interaction.user.username:'N',inline:true}

                        )
                        .setFooter({ text: 'CSBC團隊', iconURL: 'https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798' });
                    await interaction.editReply({embeds:[Failed]});
                    return;
                }
                await interaction.editReply('檢查是否存在 ban list');

                [BanDB,DBCheck] = await SaveData(
                    env.PrivateDB[0],
                    env.PrivateDB[1].Ban,
                    0,
                    'Uuid',
                    Uuid.id,
                )
                if(DBCheck){
                    let OtherAccList = await BanDB.get('OtherDiscord');
                    OtherAccList = OtherAccList.trim().split('-')
                        if (OtherAccList.includes(interaction.user.id)) {
                            let member = interaction.member;
                            await member.send(`該 Minecraft(${Uuid.id}) 帳號已在ban名單`)
                            await member.ban();
                            return;
                        }
                        OtherAccList.push(`${interaction.user.id}`)
                    let Discord = OtherAccList.join('-')
                    await BanDB.set('OtherDiscord',Discord)
                    await BanDB.set(`DiscordId`,`'${BanDB.get('DiscordId')}`);
                    await BanDB.save()
                    await interaction.editReply('該 Minecraft 帳號已在ban名單')
                    let member = interaction.member;
                    await member.send(`該 Minecraft(${Uuid.id}) 帳號已在ban名單`)
                    await member.ban();
                    return;
                }





                try {
                        await interaction.member.setNickname(status.player.displayname,"Verify")
                        await interaction.member.roles.add(env.VerifyRole, "驗證成功");
                        await interaction.member.roles.remove(env.NonVerify,"驗證成功");
                        await interaction.member.roles.add(env.Member,"驗證成功");

                        let UnixTime = new Date().getTime()
                        UnixTime = Math.floor(UnixTime / 1000)
                        const JoinTime = Math.floor(interaction.member.joinedAt / 1000)


                        //儲存進db
                        const [Rows,Search] = await SaveData(
                            env.PrivateDB[0],
                            env.PrivateDB[1].Member,
                            0,
                            'Uuid',
                            Uuid.id
                        )

                        let DBStatus = "";
                        //console.log( await Rows.get('DiscordId'),interaction.member.id);
                        if(Search){
                           // console.log( await Rows.get('DiscordId'),interaction.member.id,await Rows.get('DiscordId')!==interaction.member.id);
                            if(await Rows.get('DiscordId')!== interaction.member.id){
                                await interaction.editReply({content:"該Minecraft帳號已在伺服器綁定DC過，請聯絡管理員",ephemeral:true})
                                return;
                            }else{
                                await Rows.assign({
                                    DiscordId: `'${interaction.member.id}`,
                                    Uuid: Uuid.id,
                                    time: UnixTime,
                                    JoinTime: JoinTime
                                });

                                await Rows.save();

                                DBStatus = '修改資料庫資料';
                            }
                        }else {
                            let [Sheet,SearchUuid] = await SaveData(
                                env.PrivateDB[0],
                                env.PrivateDB[1].Member,
                                0,
                                'DiscordId',
                                interaction.member.id
                            )
                            if(SearchUuid){
                                await Sheet.set('Uuid',Uuid.id)
                                await Sheet.set('DiscordId',`'${interaction.member.id}`)
                                DBStatus = '覆蓋原始Uuid'
                            }
                            else {
                                await Rows.addRow({
                                    DiscordId: `'${interaction.member.id}`,
                                    Uuid: Uuid.id,
                                    time: UnixTime,
                                    JoinTime: JoinTime
                                });
                                DBStatus = '新的資料儲存進資料庫';
                            }
                        }
                        await interaction.editReply('未檢測到在ban list')

                        const Success = new EmbedBuilder()
                            .setColor(0x009FF)
                            .setTitle('驗證成功')
                            .setDescription(`完成驗證 以下狀態`)
                            .addFields(
                                {name:`驗證狀態`,value:`成功`},
                                {name:'是否存在資料庫',value:DBStatus},
                                {name:`API` ,value:`隱藏資訊`,inline:true},
                                {name:`UUID`,value:`${Uuid.id?Uuid.id:'uuid讀取失敗'}`,inline:true},
                                {name:`綁定狀態` , value:' '},
                                {name:`Hypixel 綁定狀態` , value:status.player.socialMedia.links.DISCORD?status.player.socialMedia.links.DISCORD:'N',inline:true},
                                {name:'Discord ID',value:interaction.user.username?interaction.user.username:'N',inline:true}

                            )
                            .setFooter({ text: 'CSBC團隊', iconURL: 'https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798' });
                        await interaction.editReply({content: `給予 <@&${env.VerifyRole}>` ,embeds: [Success]});

                        let Verify_channel = await client.channels.cache.get('1193043263553278042');
                        Verify_channel.send(`<@${interaction.member.id}> Finish Verify Link to ${status.player.displayname}`)


                    }catch (err){
                        await interaction.editReply({content:`發生一些錯誤,請聯絡管理員`});
                        await ErrorMassage(client,err,interaction)
                        console.log(err)


                    }



            }


        }catch(error){
            await ErrorMassage(client,error,interaction)
            console.error(error);
        }
    }
}

