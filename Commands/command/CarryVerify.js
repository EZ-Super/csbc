const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const {SaveData} = require('../../Function/GetDB')
const env = require('../../env.json')
const GF = require("../../Function/fetch");
const Role = require('../../Role.json')
const {ErrorMassage} = require('../../Function/ErrorMassage')

module.exports={
    data :
        new SlashCommandBuilder()
            .setName("carrier_verify")
            .setDescription("carrier 驗證")
            .addSubcommand(sub=>
                sub
                    .setName("catacombs")
                    .setDescription('驗證一般樓層carry 身分組')
                    .addUserOption(op=>op
                        .setName('member')
                        .setDescription('成員')
                        .setRequired(true)
                    )
                    .addStringOption(op=>op
                        .setName('floor')
                        .setDescription('樓層')
                        .addChoices(
                            {name:'F7',value:'F7'},
                            {name:'F6',value:'F6'},
                            {name:'F5',value:'F5'},
                            {name:'F4',value:'F4'},
                        )
                        .setRequired(true)
                    )
            )
            .addSubcommand(sub=>
                sub
                    .setName("master")
                    .setDescription('驗證一般樓層Master 身分組')
                    .addUserOption(op=>op
                        .setName('member')
                        .setDescription('成員')
                        .setRequired(true)
                    )
                    .addStringOption(op=>op
                        .setName('floor')
                        .setDescription('樓層')
                        .addChoices(
                            {name:'M7',value:'M7'},
                            {name:'M6',value:'M6'},
                            {name:'M5',value:'M5'},
                            {name:'M4',value:'M4'},
                            {name:'M3',value:'M3'},
                            {name:'M2',value:'M2'},
                            {name:'M1',value:'M1'},
                        )
                        .setRequired(true)
                    )

            )
            .addSubcommand(sub=>
                sub
                    .setName("slayer")
                    .setDescription('驗證一般樓層slayer 身分組')
                    .addUserOption(op=>op
                        .setName('member')
                        .setDescription('成員')
                        .setRequired(true)
                    )
                    .addStringOption(op=>op
                        .setName('type')
                        .setDescription('slayer 種類')
                        .addChoices(
                            {name:'Eman',value:'Eman'},
                            {name:'Blaze',value:'Blaze'},
                            {name:'Rev',value:'Rev'},
                        )
                        .setRequired(true)
                    )
                    .addStringOption(op=>
                        op
                            .setName('tire')
                            .setDescription('Tier')
                            .addChoices(
                                {name:'T5',value:'T5'},
                                {name:'T4',value:'T4'},
                                {name:'T3',value:'T3'},
                                {name:'T2',value:'T2'},
                            )
                            .setRequired(true)
                    )

            )
            .addSubcommand(sub=>
                sub
                    .setName("kuudra")
                    .setDescription('驗證一般樓層kuudra 身分組')
                    .addUserOption(op=>op
                        .setName('member')
                        .setDescription('成員')
                        .setRequired(true)
                    )
                    .addStringOption(op=>op
                        .setName('floor')
                        .setDescription('樓層')
                        .addChoices(
                            {name:'Infernal',value:'Infernal'},
                            {name:'Fiery',value:'Fiery'},
                            {name:'Burning',value:'Burning'},
                            {name:'Hot',value:'Hot'},
                            {name:'Basic',value:'Basic'},
                        )
                        .setRequired(true)
                    )

            )

    ,
    async execute(client,interaction){
        try {
            if(!interaction.member._roles.includes("1193038800918687806")) { interaction.reply({content:"你沒有權限",ephemeral:true}); return;}

            await interaction.reply({content:'新增到資料庫中',ephemeral:true})

            let member = interaction.options.getMember('member')
            let role
            if(interaction.options.getSubcommand() === 'catacombs'){
                await interaction.options.getMember('member').roles.add('1193077319154286662')
                let f = '';
                for(let i=0 ;i<4;i++){
                    f = "F"+(7-i) ;
                    if(interaction.options.getString('floor')===f) {
                        await StoreDB(interaction, 'Catacombs', 7 - i);
                        role = Role.CatacombsRole[i];
                    }
                }
            }else if(interaction.options.getSubcommand()==='master'){
                await interaction.options.getMember('member').roles.add('1193077640098234529')
                let f = '';
                for(let i=0 ;i<7;i++){
                    f = "M"+(7-i) ;
                    if(interaction.options.getString('floor')===f) {
                        await StoreDB(interaction, 'Master', 7 - i);
                        role = Role.MasterRole[i];
                    }
                }
            }else if(interaction.options.getSubcommand()==='slayer'){
                    if(interaction.options.getString('type') === 'Blaze'){
                        await interaction.options.getMember('member').roles.add('1193077972043837522')
                        switch (interaction.options.getString('tire')){
                            case 'T4':
                                await StoreDB(interaction,'Blaze',4);
                                role = Role.SlayerRole[0].Blaze[0];
                                break
                            case 'T3':
                                await StoreDB(interaction,'Blaze',3);
                                role = Role.SlayerRole[0].Blaze[1];
                                break
                            case 'T2':
                                await StoreDB(interaction,'Blaze',2);
                                role = Role.SlayerRole[0].Blaze[2];
                                break
                            default:
                                console.log('超出')
                        }

                    }else if(interaction.options.getString('type') === 'Eman'){
                        await interaction.options.getMember('member').roles.add('1193077806943445143')
                        switch (interaction.options.getString('tire')){
                            case 'T4':
                                await StoreDB(interaction,'Eman',4);
                                role = Role.SlayerRole[0].Eman[0];
                                break
                            case 'T3':
                                await StoreDB(interaction,'Eman',3);
                                role = Role.SlayerRole[0].Eman[1];
                                break
                            default:
                                console.log('超出')
                        }

                    }else if(interaction.options.getString('type')=== 'Rev'){
                        await interaction.options.getMember('member').roles.add('1193078765845221426')
                        switch (interaction.options.getString('tire')){
                            case 'T5':
                                await StoreDB(interaction,'Rev',4);
                                role = Role.SlayerRole[0].Rev[0];
                                break
                            default:
                                console.log('超出')
                        }
                    }

            }else if(interaction.options.getSubcommand()==='kuudra'){
                await interaction.options.getMember('member').roles.add('1193078181633216512')
                switch (interaction.options.getString('floor')){
                    case 'Infernal':
                        await StoreDB(interaction,'Kuudra',5);
                        role = Role.KuudraRole[0];
                        break
                    case 'Fiery':
                        await StoreDB(interaction,'Kuudra',4);
                        role = Role.KuudraRole[1];
                        break
                    case 'Burning':
                        await StoreDB(interaction,'Kuudra',3);
                        role = Role.KuudraRole[2];
                        break
                    case 'Hot':
                        await StoreDB(interaction,'Kuudra',2);
                        role = Role.KuudraRole[3];
                        break
                    case 'Basic':
                        await StoreDB(interaction,'Kuudra',1);
                        role = Role.KuudraRole[4];
                        break
                    default:
                        console.log('超出')
                }
            }
            if(role === undefined){ await interaction.editReply('請確認資訊是否有誤'); return;};

            await interaction.options.getMember('member').roles.add(role)



            const time = new Date().getTime()
            const UnixTime = Math.floor(time / 1000)
            const CarrierEmbed = new EmbedBuilder()
                .setDescription(`**給予 <@&${role}>**`)
                .setThumbnail('https://cdn.discordapp.com/attachments/1193839285766475776/1194205012344193044/b576eb2b12516a2f13b0fa9c1a0e571d.png?ex=65af8116&is=659d0c16&hm=08615eebbe97238eb27f48382cac28c2c3d462388a2bddb9b747a0a676f954fd&')
                .addFields(
                    {name:'Carrier',value:`<@${member.user.id}>`},
                    {name:'Channel',value:`${interaction.channel.name}`},
                    {name:'Moderator',value:`<@${interaction.member.id}>`},
                    {name:'Time',value:`<t:${UnixTime}>`}

                )
                .setFooter({text:`${interaction.guild.name}`,iconURL:'https://cdn.discordapp.com/attachments/1193839285766475776/1194205012344193044/b576eb2b12516a2f13b0fa9c1a0e571d.png?ex=65af8116&is=659d0c16&hm=08615eebbe97238eb27f48382cac28c2c3d462388a2bddb9b747a0a676f954fd&'})
                .setTimestamp()

            await interaction.editReply({embeds:[CarrierEmbed]})
            let channel = client.channels.cache.get('1194247825714839554');
            channel.send({embeds:[CarrierEmbed]});

        }catch (error){
            //await ErrorMassage(client,error,interaction)
            console.log(error)
        }

    }
}

async function StoreDB(interaction,type,Tier){

    let [Sheet,change] = await SaveData(
        env.PrivateDB[0],
        env.PrivateDB[1].Carrier,
        0,
        'DiscordID',
        interaction.options.getMember('member').user.id
    )

    if(change){
        if(Sheet.get(type)>Tier) return;
        await Sheet.set(type,Tier);
        await Sheet.set('VerifyAdmin',interaction.member.id)
        await Sheet.set('DiscordID',`'${interaction.options.getMember('member').user.id}`)
        await Sheet.save();
    }else{
        await interaction.options.getMember('member').roles.add('1193076957705936896')


        const MinecraftUUID = `https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString('minecraft_id')}`;
        const Uuid = await GF.GetFetch(MinecraftUUID);
        const date = new Date();
        const options = {
            timeZone: 'Asia/Taipei',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        let time = new Intl.DateTimeFormat('en-US', options).format(date)
        await Sheet.addRow({
            DiscordID:`'${interaction.options.getMember('member').user.id}`,
            Uuid:Uuid.id,
            Catacombs:0,
            Master:0,
            Blaze:0,
            Eman:0,
            Rev:0,
            Kuudra:0,
            VerifyDate:time,
            VerifyAdmin:interaction.member.id
        })

        let Rows = await Sheet.getRows();


        for(let i =0;i<Rows.length;i++) {
            if(Rows[i].get('DiscordID') === interaction.options.getMember('member').user.id) {
                await Rows[i].set(type, Tier);
                await Rows[i].set('DiscordID',`'${interaction.options.getMember('member').user.id}`)
                await Rows[i].save();
            }
        }
    }
}

