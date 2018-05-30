const uuid = require('node-uuid')
const dbUtil = require('../db/base')

const TokenManager = function(){
    let self = this
    
    self._createToken = function(userId){
        let uid = uuid.v4().replace(/-/g, '')
        let tokenModel = {
            id: userId,
            token: uid
        }
        //TODO save to database
        dbUtil.query('insert into t_token(user_id, token_str) values(?,?)',[tokenModel.id, tokenModel.token]).then(data => {
            return tokenModel
        })
        .catch(err => {
            return null
        })

        return tokenModel
    }

    self._getToken = function(auth){

    }

    self._checkToken= function(token){
        //date check
    }

    self._deleteToken = function(token){

    }

    return {
        createToken: self._createToken,
        // getToken,
        // checkToken,
        // deleteToken
    }
}

module.exports = TokenManager