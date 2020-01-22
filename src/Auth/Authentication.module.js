
var CryptoJS = require("crypto-js");
var SECERET_KEY = '_*Mauvalsa@95?36839421';

function getApiKey(val){
    return CryptoJS.HmacSHA256(val.toString(), SECERET_KEY ).toString()
}

function validateApiKey(apiKey){
    if(apiKey){
        var date = new Date()
        var actDate = date.valueOf()
        var apidate = apiKey.split('%$&')
        var reqdate = apidate[0]
        var token = getApiKey(reqdate)
        var datediff = actDate - reqdate
        if(datediff > 20000 || token != apidate[1])
            return false
        else
            return true
        
    }else{
        return false
    }
    
    
}

module.exports = validateApiKey
