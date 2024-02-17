const fetch = require('node-fetch');

let GetFetch = async (link)=>{
		let result;
        const response = await fetch(link).then(r => {
             return  r.json().then(val => {
                result = val;

            }).catch(err => {
                console.log("===========================some error");
                console.log(err);

            })
        })
        //console.log(result)
        return result


}



module.exports = {GetFetch}