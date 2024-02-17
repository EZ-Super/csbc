const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const env = require('../../env.json')
const {SaveData} = require('../../Function/GetDB')
const {ErrorMassage} = require('../../Function/ErrorMassage')
const {BanMember} = require('../../Function/Ban')
const fs = require('fs');

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('ban')
            .setDescription('Ban 某人')
            .addSubcommand(sub=>
            sub
                .setName('add')
                .setDescription('Ban 某人')
                .addUserOption(op=>
                    op
                        .setName('member')
                        .setDescription('member')
                        .setRequired(true)
                )
                .addStringOption(op=>
                    op
                        .setName('reason')
                        .setDescription('原因')
                        .setRequired(true)
                )
                .addStringOption(op=>
                    op
                        .setName('rule')
                        .setDescription('違反哪條規定')
                        .addChoices(
                            {name:'尊重所有成員並平等對待每個人，無論性別、宗教或種族',value:'1'},
                            {name:'禁止種族主義',value:'2'},
                            {name:'禁止刷頻',value:'3'},
                            {name:'直接和間接威脅',value:'4'},
                            {name:'禁止不宜內容',value:'5'},
                            {name:'討論政治和宗教是不受歡迎的',value:'6'},
                            {name:'遵循 Discord 社群準則和服務條款',value:'7'},
                            {name:'禁止廣告',value:'8'},
                            {name:'禁止被認定為惡意的影片內容',value:'9'},
                            {name:'請勿在任何頻道中發布會導致他人 Discord 崩潰的東西',value:'10'},
                            {name:'使用對應的頻道',value:'11'},
                            {name:'其他',value:'12'},
                        )
                )
            ),
    async execute(client,interaction) {
        try {

            if (!interaction.member._roles.includes('1193038800918687806')) {
                await interaction.reply({content: '你沒有權限', ephemeral: true})
                return;
            }
            if(interaction.options.getSubcommand() === 'add') {

                const member = await interaction.options.getMember('member')
                const id = member.id
        
                interaction.reply(`Banned <@${member.id}> \n Reason:${interaction.options.getString('reason')}`)
                const [Sheet, check] = await SaveData( //check member list
                    env.PrivateDB[0],
                    env.PrivateDB[1].Member,
                    0,
                    'DiscordId',
                    id,
                )
                if(check){
                    const uuid = await Sheet.get('Uuid')
                    await BanMember(
                        client,
                        interaction,
                        uuid,
                        member,
                        interaction.options.getString('rule'),
                        interaction.options.getString('reason')
                    )
                     
                    await Sheet.delete();
                    
                }else {
                    await BanMember(
                        client,
                        interaction,
                        null,
                        member,
                        interaction.options.getString('rule'),
                        interaction.options.getString('reason')
                    )
                  
                }
                 await member.ban();
              
            }
        }catch (error){
            await ErrorMassage(client,error,interaction)

  
        }
    }
}

