const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const env = require('../../env.json')
const {SaveData} = require('../../Function/GetDB')
const {ErrorMassage} = require('../../Function/ErrorMassage')

module.exports={
    data:
        new SlashCommandBuilder()
            .setName('unban')
            .setDescription('解ban')
            .addStringOption(op=>op
                .setName('discord_id')
                .setDescription('discord id')
            )
            .addStringOption(op=>op
                .setName('uuid')
                .setDescription('uuid')
            ),
    async execute(client,interaction){
        try {
            if (!interaction.member._roles.includes('1193418411670257775') && !interaction.member._roles.includes('1193948368330817596')) {
                interaction.reply("你沒有權限使用指令unban");
                return
            }

            interaction.reply({content:'查詢資料庫',ephemeral:true})
            let member = interaction.options.getString('discord_id')
            let  Uuid
            Uuid = interaction.options.getString('uuid')
            let user;
           // if(member !== null ) user = await client.users.fetch(member);
            const guild = client.guilds.cache.get('1173827041569804348')

         //   console.log(`${Uuid} ${member}`)

          

            let [Sheet, Check] = [];
            if(member === null && Uuid !== null) {
                [Sheet, Check] = await SaveData(
                    env.PrivateDB[0],
                    env.PrivateDB[1].Ban,
                    0,
                    'Uuid',
                    Uuid
                )
            }else if(Uuid === null && member!==null){
                [Sheet, Check] = await SaveData(
                    env.PrivateDB[0],
                    env.PrivateDB[1].Ban,
                    0,
                    'DiscordId',
                    member
                )
            }else{
                await interaction.editReply('資料錯誤');
                return;
            }
           // console.log(Sheet)
            if(Check) {
                if(member===null){ member = Sheet.get('DiscordId')}
                await Sheet.delete();
             }
              guild.bans.remove(member)
            await interaction.editReply('已unban')

        }catch (error){
            await ErrorMassage(client,error,interaction)
           // console.log(error)
        }
    }
}