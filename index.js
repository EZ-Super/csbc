const {EmbedBuilder,Client, GatewayIntentBits, ActivityType, Collection} = require("discord.js");
const env = require('./env.json');
const fs = require("fs");
const path = require("path");
const { CronJob } = require('cron');
const readline = require("readline");
const {ErrorMassage} = require('./Function/ErrorMassage')
const {SaveData} = require("./Function/GetDB");
require('./signcommand')


let BackSideCommand = new Collection();
let ButtonCommand = new Collection();
let FormCommand = new Collection();

const client = new Client({
    intents: [
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildBans,
    ]
})



const RL = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

RL.on('line',async (input)=>{

    input = input.replace("/","");
    const command = BackSideCommand.get(input)
    console.log(`Receive ${input}`);
    if(command){
        command.execute(client)
    }
    else if(input === "reload"){
        await ReloadCommand();
    }
    else if(input === 'down'){
        await client.destroy();
    }
    else if(input === 'on'){
        await client.login(env.token)
    }


})

client.on('ready', () => {
    client.user.setActivity("CSBC team Comming Soon",{type: ActivityType.Playing});
    client.user.setStatus('dnd');
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
    console.log(`${new Intl.DateTimeFormat('en-US', options).format(date)} | ${client.user.tag}登入完成!`);

});


LoadCommand();

client.on('interactionCreate',async interaction=>{
  if(interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      const channel = client.channels.cache.get(env.ErrorChannel);
      const CommandUse = new EmbedBuilder()
          .setColor(0x009FF)
          .setTitle('指令輸入')
          .setDescription('有人使用指令')
          .addFields(
              {name: '指令', value: interaction.commandName},
              {name: 'SubCommand', value: interaction.options._subcommand ? interaction.options._subcommand : "N"},
              {name: '使用者', value: `<@${interaction.user.id}>`},
              {name: 'Channel', value: `<#${interaction.channelId}>`},
          )
          .setTimestamp()
      channel.send({embeds: [CommandUse]})


      if (command) {
          try {
              await command.execute(client, interaction)
          } catch (error) {
              console.error(error);
              await ErrorMassage(client, error, interaction)
              await interaction.reply({content: '發生一些錯誤請回報', ephemeral: true});
          }
      }
  }else if(interaction.isButton() ){
      //console.log(interaction.customId);
        const Button = ButtonCommand.get(interaction.customId);

        if(!Button) return;
        const channel = client.channels.cache.get(env.ErrorChannel);
        const ButtonUse = new EmbedBuilder()
            .setColor(0x009FF)
            .setTitle('按鈕監測')
            .setDescription('有人使用按鈕')
            .addFields(
                {name: '指令', value: interaction.customId},
                {name: '使用者', value: `<@${interaction.user.id}>`},
                {name: 'Channel', value: `<#${interaction.channelId}>`},
            ).setTimestamp()

      channel.send({embeds: [ButtonUse]})

      if (Button) {
          try {
              await Button.execute(client, interaction)
          } catch (error) {
              console.error(error);
              await ErrorMassage(client, error, interaction)
              await interaction.reply({content: '發生一些錯誤請回報', ephemeral: true});
          }
      }


  }else if(interaction.isModalSubmit()){
      //console.log(interaction.customId);
      const Form = FormCommand.get(interaction.customId);

      if(!Form) return;
      const channel = client.channels.cache.get(env.ErrorChannel);

      const FormUse = new EmbedBuilder()
          .setColor(0x009FF)
          .setTitle('表格監測')
          .setDescription('有人傳送表格')
          .addFields(
              {name: '指令', value: interaction.customId},
              {name: '使用者', value: `<@${interaction.user.id}>`},
              {name: 'Channel', value: `<#${interaction.channelId}>`},
          ).setTimestamp()

      channel.send({embeds: [FormUse]})

      if (Form) {
          try {
              await Form.execute(client, interaction)
          } catch (error) {
              console.error(error);
              await ErrorMassage(client, error, interaction)
              await interaction.reply({content: '發生一些錯誤請回報', ephemeral: true});
          }
      }
  }
})
/*
client.on('guildBanAdd', async (banInfo) => {
    console.log('test')
    try {
        const user = banInfo.user;
        const guild = banInfo.guild;
        const auditLogs = await guild.fetchAuditLogs();
        const banLog = auditLogs.entries.first();


        let [DB,Check] = SaveData(
            env.PrivateDB[0],
            env.PrivateDB[1].Member,
            1,
            'DiscordId',
            user.id
        )
        if(Check){

        }else{

        }



        // 检查是否是相同的用户
            const reason = banLog.reason || '未提供原因';
            //console.log(`成员 ${user.tag} 被封禁，原因：${reason}`);
        //console.log(banInfo)
    } catch (error) {
        console.error('无法获取封禁信息：', error);
    }
});
*/

client.login(env.token);





function LoadCommand(){
    console.log('📀 | 指令載入中');
    const CommandPath = path.join(__dirname,'Commands','command');
    const CommandFiles = fs.readdirSync(CommandPath).filter(f=>f.endsWith('js'));

    client.commands = new Collection();
    for(let file of CommandFiles){
        const filepath = path.join(CommandPath,file);
        //console.log("load" + filepath);
        const command = require(filepath);
        client.commands.set(command.data.name,command);
        console.log(`✅ ${file} 指令執行正常`);
    }
    console.log('📀 | 指令載入完成,讀取後臺指令');


    const BackCommandPath = path.join(__dirname,'BackSideCommand');
    const BackCommandFiles = fs.readdirSync(BackCommandPath).filter(f=>f.endsWith('js'));

    for(let BCS of BackCommandFiles){
        const filepath = path.join(BackCommandPath,BCS)
        const BackCommand =require(filepath)
        BackSideCommand.set(BackCommand.name,BackCommand);
        console.log(`✅ ${BCS} 指令執行正常`);
    }
    console.log('📀 | 後台指令載入完成,開始註冊按鈕指令');


    const ButtonPath = path.join(__dirname,'Commands','button');
    const ButtonFiles = fs.readdirSync(ButtonPath).filter(f=>f.endsWith('js'));

    for(let BCS of ButtonFiles){
        const filepath = path.join(ButtonPath,BCS)
        const Button =require(filepath)
        ButtonCommand.set(Button.name,Button);
        console.log(`✅ ${BCS} 指令執行正常`);
    }
    console.log('📀 | 按鈕完成 ,開始註冊 表格');



    const FormPath = path.join(__dirname,'Commands','form');
    const FormFiles = fs.readdirSync(FormPath).filter(f=>f.endsWith('js'));

    for(let BCS of FormFiles){
        const filepath = path.join(FormPath,BCS)
        const Form =require(filepath)
        FormCommand.set(Form.name,Form);
        console.log(`✅ ${BCS} 指令執行正常`);
    }
    console.log('📀 | 按鈕完成');

}
function ReloadCommand(){
    console.log("刪除指令")
    client.commands.clear();
    const CommandPath = path.join(__dirname,'Commands','command');
    const CommandFiles = fs.readdirSync(CommandPath).filter(f=>f.endsWith('js'));

    const FunctionsPath = path.join(__dirname,'Function');
    const FunctionFiles = fs.readdirSync(FunctionsPath).filter(f=>f.endsWith('js'));

    const ButtonPath = path.join(__dirname,'Commands','button');
    const ButtonFiles = fs.readdirSync(ButtonPath).filter(f=>f.endsWith('js'));

    const FormPath = path.join(__dirname,'Commands','form');
    const FormFiles = fs.readdirSync(FormPath).filter(f=>f.endsWith('js'));

    for(let file of CommandFiles){
        const filepath = path.join(CommandPath,file);
        delete require.cache[require.resolve(`${filepath}`)];
    }
    for(let Function of FunctionFiles){
        const FunctionPath = path.join(FunctionsPath,Function)
        delete require.cache[require.resolve(`${FunctionPath}`)];
    }

    for(let Button of ButtonFiles){
        const ButtonsPath = path.join(ButtonPath,Button)
        delete require.cache[require.resolve(`${ButtonsPath}`)];
    }

    for(let Form of FormFiles){
        const FormsPath = path.join(FormPath,Form)
        delete require.cache[require.resolve(`${FormsPath}`)];
    }

    LoadCommand();
}

