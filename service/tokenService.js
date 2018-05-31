let tokenDao = require('../dao/tokenDao')
const uuid = require('node-uuid')
const Const = require('../common/const')
let tokenService = function () {

    let tokendao = new tokenDao()
    let self = this

    self._createToken = function (user_id) {
        let uid = uuid.v4().replace(/-/g, '')
        let tokenModel = {
            id: user_id,
            token: uid
        }
        tokendao.createToken(tokenModel.id, tokenModel.token)
            .then(data => {
                return tokenModel
            })
            .catch(err => {
                console.error(err)
                return Const.ERR_CODE
            })
    }

    self._getToken = function (auth) {
        if (!!auth) {
            if (typeof auth == 'string') {
                let authArr = auth.split('_')
                if (authArr.length == 2) {
                    return {
                        id: authArr[0],
                        token: authArr[1]
                    }
                }
            }
        }
        return null
    }

    self._checkToken = function (auth) {
        if (self._getToken(auth)) {
            //chazhao token shujuku 
            tokendao.resolveToken(token.id)
                .then(data => {
                    if (data.length > 0) {
                        if (data[0].token_str == tokenModel.token)
                            return true
                    }
                })
        }
        return false
    }

    return {
        createToken: self._createToken,
        checkToken: self._checkToken,

    }
}

module.exports = tokenService