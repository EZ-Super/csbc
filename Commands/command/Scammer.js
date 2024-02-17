const {SlashCommandBuilder} = require('discord.js')
const {SaveData} = require('../../Function/GetDB')


module.exports={
    data : new SlashCommandBuilder()
        .setName('scammer')
        .setDescription('Scammer')
        .addSubcommand(sub =>
            sub
                .setName('add')
                .setDescription('新增Scammer')
                .addUserOption(op=>
                    op
                        .setName('discord_id')
                        .setDescription('Discord ID')
                )
                .addStringOption(op=>
                    op
                        .setName('minecraft_ign')
                        .setDescription('IGN')
                )
        )
        .addSubcommand(sub=>
            sub
                .setName('check')
                .setDescription('檢查是否為scammer')
                .addUserOption(op=>
                    op
                        .setName('discord_id')
                        .setDescription('Discord ID')
                )
        ),
    async execute(client,interaction){
        try {
            if (interaction.options.getSubcommand() === 'add') {

            }else if(interaction.options.getSubcommand() === 'check'){

            }
        }catch(err){
            console.log(err);
        }
    }
}