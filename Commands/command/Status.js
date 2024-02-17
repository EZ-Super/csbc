const {SlashCommandBuilder,EmbedBuilder,CommandInteractionOptionResolver} = require('discord.js');
module.exports = {
	data:
		new SlashCommandBuilder()
		.setName('service')
		.setDescription('查詢伺服器服務狀態')
		.addSubcommand(sub=>sub
			.setName('status')
			.setDescription('查詢server服務狀態')
		)


	,
	//owner : 1193035830722297856
	async execute(client,interaction){
		try{


			if(!interaction.member._roles.includes("1193035830722297856")) {
				interaction.reply({content:`你沒有權限使用該指令 請前往 <#1193874336365424772> 觀看 `, ephemeral: true });
				return;
			}
			if(interaction.channel.id !== "1193874336365424772") {
				interaction.reply({content:"此頻道無法使用該指令", ephemeral: true });
				return;
			}
			console.log(interaction.member._roles);
			if(interaction.options.getSubcommand() === "status"){
				const Status = new EmbedBuilder()
					.setColor(0x009FF)
					.setTitle('CSBC 服務狀態')
					.setDescription(`CSBC各服務狀態顯示`)
					.setThumbnail('https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798')

					.addFields(

						{ name: '服務團隊 ', value: ' ' },
						{ name: 'Carry 驗證', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: '幫助', value: ' ' },
						{name : 'Status' , value:'Work' , inline:true},
						{name : 'Reason' , value:'Work' , inline:true},

					)

				const CataCombs = new EmbedBuilder()
					.setColor(0x009FF)
					.setTitle('CSBC CataCombs服務狀態')
					.setDescription(`CSBC CataCombs服務狀態`)
					.setThumbnail('https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798')

					.addFields(

						{ name: 'Catacombs ', value: ' ' },
						{ name: 'F4', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'F5', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'F6', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'F7', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},

					)					.setFooter({ text: 'CSBC團隊', iconURL: 'https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798' });
				const Master = new EmbedBuilder()
					.setColor(0x009FF)
					.setTitle('CSBC Master Mode服務狀態')
					.setDescription(`CSBC Master Mode服務狀態`)
					.setThumbnail('https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798')

					.addFields(

						{ name: 'Master Mode ', value: ' ' },
						{ name: 'M1', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'M2', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'M3', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'M4', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'M5', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'M6', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'M7', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},

					)					.setFooter({ text: 'CSBC團隊', iconURL: 'https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798' });
				const Slayer = new EmbedBuilder()
					.setColor(0x009FF)
					.setTitle('CSBC Slayer服務狀態')
					.setDescription(`CSBC Slayer服務狀態`)
					.setThumbnail('https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798')

					.addFields(

						{ name: 'Slayer ', value: ' ' },
						{ name: 'T4 Blaze', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'T3 Blaze', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'T2 Blaze', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'T4 Eman', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'T3 Eman', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'Rev Carrier', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},

					)
					.setFooter({ text: 'CSBC團隊', iconURL: 'https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798' });

				const Kuudra = new EmbedBuilder()
					.setColor(0x009FF)
					.setTitle('CSBC Kuudra服務狀態')
					.setDescription(`CSBC Kuudra服務狀態`)
					.setThumbnail('https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798')

					.addFields(

						{ name: 'Kuudra ', value: ' ' },
						{ name: 'Basic', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'Hot', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: 'Burning', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{name: 'Fiery', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{name: 'Infernal', value: ' ' },
						{name : 'Status' , value:'Comming Soon' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},


					)
					.setFooter({ text: 'CSBC團隊', iconURL: 'https://media.discordapp.net/attachments/900668261748867082/1193590729193312256/sadasdas.png?ex=65ad44fd&is=659acffd&hm=830e98c9c5360e32fdc0c5bdde8b73bd28a522c6de9bd15051cd4622f98aa998&=&format=webp&quality=lossless&width=810&height=798' });





				interaction.channel.send({embeds:[Status]});
				interaction.channel.send({embeds:[CataCombs]});
				interaction.channel.send({embeds:[Master]});
				interaction.channel.send({embeds:[Slayer]});
				interaction.channel.send({embeds:[Kuudra]});
			}


		}catch(error){
			console.error(error);
		}
	}
}

/*	{ name: 'Catacombs ', value: ' ' },
    { name: 'F4', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'F5', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'F6', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'F7', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},


    { name: 'Master Mode ', value: ' ' },
    { name: 'M1', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'M2', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'M3', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'M4', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'M5', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'M6', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'M7', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},

    { name: 'Slayer ', value: ' ' },
    { name: 'T4 Blaze', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'T3 Blaze', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'T2 Blaze', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'T4 Eman', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'T3 Eman', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},
    { name: 'Rev Carrier', value: ' ' },
    {name : 'Status' , value:'Close' , inline:true},
    {name : 'Reason' , value:'尚未上架' , inline:true},

    						{ name: '服務團隊 ', value: ' ' },
						{ name: 'Carry 驗證', value: ' ' },
						{name : 'Status' , value:'Close' , inline:true},
						{name : 'Reason' , value:'尚未上架' , inline:true},
						{ name: '幫助', value: ' ' },
						{name : 'Status' , value:'Work' , inline:true},
						{name : 'Reason' , value:'Work' , inline:true},
    */