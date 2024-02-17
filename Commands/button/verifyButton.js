const {ModalBuilder,TextInputBuilder,TextInputStyle ,ActionRowBuilder} = require('discord.js')
const env = require('../../env.json')
const {ErrorMassage} = require('../../Function/ErrorMassage')

module.exports={
        name : 'buttonverify',
        async execute(client,interaction) {
            try{
                const VerifyForm = new ModalBuilder()
                    .setCustomId('verifyform')
                    .setTitle('驗證表格')

                const IGN = new TextInputBuilder()
                    .setCustomId('ign')
                    .setLabel('Minecraft ID')
                    .setStyle(TextInputStyle.Short)

                const FirstActionRow = new ActionRowBuilder().addComponents(IGN);

                VerifyForm.addComponents(FirstActionRow);


                await interaction.showModal(VerifyForm);

            }catch (err){
                await ErrorMassage(client,err,interaction)
                console.log(err);
            }
        }

}

