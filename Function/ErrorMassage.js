const env = require("../env.json")
const {EmbedBuilder, } = require("discord.js");



let ErrorMassage = async(client,err,interaction)=>{
    const channel = client.channels.cache.get(env.ErrorReportChannel);
    const ErrorEmbed = new EmbedBuilder()
        .setColor(0x009FF)
        .setTitle('錯誤')
        .setDescription('發生錯誤')
        .addFields(

            {name:'指令',value:interaction.commandName},
            {name:'SubCommand',value:interaction.options._subcommand?interaction.options._subcommand:"N"},
            {name:'使用者',value:`<@${interaction.user.id}>`},
            {name:'Channel',value:`<#${interaction.channelId}>`},
            {name:'Reason',value:`${err}`}

        )
        .setTimestamp()
    //channel.send({context:'<@391850863951609876>'})
    channel.send({embeds:[ErrorEmbed]})
}
let TestErrorMassage = async(client,TestErrorChannel,err,interaction)=>{

    const channel = client.channels.cache.get(TestErrorChannel);
    const ErrorEmbed = new EmbedBuilder()
        .setColor(0x009FF)
        .setTitle('錯誤')
        .setDescription('發生錯誤')
        .addFields(
            {name:'指令',value:interaction.commandName},
                {name:'SubCommand',value:interaction.options._subcommand?interaction.options._subcommand:"N"},
                {name:'使用者',value:`<@${interaction.user.id}>`},
                {name:'Channel',value:`<#${interaction.channelId}>`},
                {name:'Reason',value:`${err}`}

        )
        .setTimestamp()

    channel.send({embeds:[ErrorEmbed]})
}

module.exports = {ErrorMassage,TestErrorMassage}


