const {GoogleSpreadsheet} = require('google-spreadsheet')
const {JWT} = require('google-auth-library')
const PrivateGSKey = require('../key/csbc-private.json');
const PublicGSKey = require('../key/csbc-public.json')

const PrivateGSToken = new JWT({
    email : PrivateGSKey.client_email,
    key : PrivateGSKey.private_key,
    scopes :[
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
    ]
})
const PublicGSToken = new JWT({
    email : PublicGSKey.client_email,
    key : PublicGSKey.private_key,
    scopes : [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
    ]
})




//SheetData : 儲存資料 ,SheetID : 儲存表ID , SheetTitle : Title,Public : 是否存取到Public DB , Compare : 比較資訊 (比較到誰就存進去)
async function SaveData(SheetID,SheetTitle,Public,CompareColIndex,CompareData){
    let GS;
    if(Public)
        GS = new GoogleSpreadsheet(SheetID,PublicGSToken);
    else
        GS = new GoogleSpreadsheet(SheetID,PrivateGSToken);
    // console.log(SheetData,SheetTitle,Public,Compare)
    await GS.loadInfo()
    const Sheet = GS.sheetsByTitle[SheetTitle];
    const Rows = await Sheet.getRows();
    for(let i = 0;i<=Rows.length;i++){
        //console.log(CompareData ,Rows[i].get(CompareColIndex) )
        if(i===Rows.length){
            return [Sheet,0] //傳回 整個表單 ,沒有搜尋到
        }
        else if(CompareData === Rows[i].get(CompareColIndex)){
            return [Rows[i],1] //穿回單一Row ,有搜尋到
        }
    }
}
async function CheckDupeData(SheetID,SheetTitle,Public,CompareColIndex,CompareData){
    let GS;
    if(Public)
        GS = new GoogleSpreadsheet(SheetID,PublicGSToken);
    else
        GS = new GoogleSpreadsheet(SheetID,PrivateGSToken);

    await GS.loadInfo()

    let time = 0,index = 0;
    const Sheet = GS.sheetsByTitle[SheetTitle];
    const Rows = await Sheet.getRows();
    for(let i = 0;i<=Rows.length;i++){
        if(CompareData === Rows[i].get(CompareColIndex)){
            time++ //穿回單一Row ,有搜尋到
            index = i;
        }
    }
    return [time,index];
}

module.exports = {SaveData,CheckDupeData}

