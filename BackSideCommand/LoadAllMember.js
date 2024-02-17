const {SaveData} = require('../Function/GetDB')
const env = require("../env.json");
const GF = require('../Function/fetch')

module.exports = {
    name : "loadallmember",
    async execute(client) {
        console.log("執行 loadallmember")
        // console.log(client.guilds.cache.get('1173827041569804348').members);

        let index = 0;
        let members = client.guilds.cache.get('1173827041569804348').members.cache;

        for (let member of members) {
            //console.log(member[1]);
            if (member[1].roles.cache.get('1193114811387629618') !== undefined && member[1].roles.cache.get('1193038800918687806') === undefined) {
                //console.log(`讀取 ${member[1].nickname}`);

                const MinecraftUUID = `https://api.mojang.com/users/profiles/minecraft/${member[1].nickname}`;
                let Uuid = await GF.GetFetch(MinecraftUUID)

                const time = new Date().getTime()
                const UnixTime = Math.floor(time / 1000)
                const JoinTime = Math.floor(member[1].joinedAt / 1000)

                setTimeout(async () => {
                    console.log( member[0], Uuid.id,  UnixTime,  JoinTime);


                    const [Rows,Search] = await SaveData(env.PrivateDB[0],env.PrivateDB[1].Member,0,'Uuid',Uuid.id)

                    let DBStatus = "";
                    //console.log( await Rows.get('DiscordId'),interaction.member.id);
                    if(Search){
                        // console.log( await Rows.get('DiscordId'),interaction.member.id,await Rows.get('DiscordId')!==interaction.member.id);
                        if(await Rows.get('DiscordId')!== member[0]){
                            console.log('資料不符合 已存在資料庫但Discord Id 不同')
                        }else {
                            await Rows.assign({
                                DiscordId: `'${member[0]}`,
                                Uuid: Uuid.id,
                                time: UnixTime,
                                JoinTime: JoinTime
                            });

                            await Rows.save();

                            DBStatus = '修改資料庫資料';
                        }
                    }else {
                        await Rows.addRow({DiscordId:`'${member[0]}`,Uuid:Uuid.id,time:UnixTime,JoinTime:JoinTime});
                        DBStatus = '新的資料儲存進資料庫';
                    }

                    console.log(`狀態 ${DBStatus} ${member[1].nickname} 完畢`)
                }, index * 2000)
                index++;

            }
        }

        /*
     client.guilds.cache.get('1173827041569804348').members.cache.asyncForeach(  async (member) => {
            if(member.roles.cache.get('1193114811387629618') !== undefined && member.roles.cache.get('1193038800918687806') === undefined){
                console.log(`讀取 ${member.nickname}`);

                const MinecraftUUID = `https://api.mojang.com/users/profiles/minecraft/${member.nickname}`;
                let Uuid =  await GF.GetFetch(MinecraftUUID)

                const date = new Date().getTime();
                const time = new Date().getTime()
                const UnixTime = Math.floor(time / 1000)
                const JoinTime = Math.floor(member.joinedAt/1000)

                setTimeout(()=>{
                    let change =  SaveData({DiscordId:member.id,Uuid:Uuid.id,time:UnixTime,JoinTime:JoinTime},
                        env.PrivateDB[0],
                        env.PrivateDB[1].Member,
                        0,
                        'Uuid');

                    console.log(`儲存 ${change} ${member.nickname} 完畢`)
                },index*1000)
                index++;

            }
    })*/
    }
}




