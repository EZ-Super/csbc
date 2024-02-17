const {SaveData} = require('../Function/GetDB')
let env = require('../env.json')
const {ErrorMassage} = require('../Function/ErrorMassage')
async function BanMember(client,interaction,Uuid,Member,Rule,Reason){

    try {

        let OtherDiscord;
        let status = "";
        let [BanSheet, BanCheck] = [0, 0];
        
            [BanSheet, BanCheck] = await SaveData( //check ban list
                env.PrivateDB[0],
                env.PrivateDB[1].Ban,
                0,
                'Uuid',
                Uuid,
            ) //確認Uuid

            if (BanCheck) {
                const time = new Date().getTime()
                const UnixTime = Math.floor(time / 1000)
                OtherDiscord = BanSheet.get('OtherDiscord')

                OtherDiscord = OtherDiscord.trim().split('-')
                if (OtherDiscord.includes(Member.id)) {
                    return;
                }
                OtherDiscord.push(`${Member.id}`)

                let Discord = OtherDiscord.join('-')
                await BanSheet.set('OtherDiscord', Discord)
                await BanSheet.set(`DiscordId`, `'${BanSheet.get('DiscordId')}`);
                //await BanSheet.save()
                Member.send(`你已被ban 原因 : ${Reason}`);
                return status;
            }
        else if (!BanCheck) {

            const time = new Date().getTime()
            const UnixTime = Math.floor(time / 1000)
            await BanSheet.addRow({
                DiscordId: `'${Member.id}`,
                Uuid: Uuid,
                time: UnixTime,
                Reason: ` ${Reason}`,
                Rule: ` ${Rule}`,
                OtherDiscord: `b-${Member.id}`,
                Admin: interaction.user.id
            })
            await Member.send(`你已被ban 原因 : ${Reason}`);
        }
    }catch (err){
        await ErrorMassage(client,err,interaction)
       // console.log(err)
    }
}



module.exports = {BanMember}