const env = require('../env.json')
const {ButtonBuilder,ButtonStyle, ActionRowBuilder,ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')

let SendMessage;

module.exports={
    name : 'VerifyMessage',
    async execute(client){
        console.log('執行 VerifyMessage '+env.VerifyMessage+" ,")

        if(env.VerifyMessage === ""){
            let channel = client.channels.cache.get(env.VerifyChannel);

            const VerifyButton = new ButtonBuilder()
                .setCustomId('buttonverify')
                .setLabel('Verify')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('1193830119664521227')

            const row = new ActionRowBuilder()
                .addComponents(VerifyButton);
            channel.send({content:'尚未開放',components:[row]});
        }
        else{
            let Message = client.channels.cache.get(env.VerifyChannel).messages.fetch(env.VerifyMessage)
                .then(message=>{
                    message.edit('點擊按鈕 開啟驗證')
                })

        }


    }

}