let tokenDao = require('../dao/tokenDao')
let userDao = require('../dao/userDao')
const uuid = require('node-uuid')
const Const = require('../common/const')
let tokenService = function () {

    let tokendao = new tokenDao()
    let userdao = new userDao()
    let self = this

    /**
     * create a token by user_id
     * if there is a token record for user_id in database, create a new token str and update the record
     * @param {*} user_id  user id
     * @return {Promise} resolve: tokenModel , reject: errcode
     */
    self._createToken = function (user_id) {
        let uid = uuid.v4().replace(/-/g, '')
        const tokenModel = {
            id: user_id,
            token: uid
        }

        return new Promise(function (resolve, reject) {
            userdao.resolveUser(user_id)
                .then(data => {
                    if (data.length === 0)
                        reject(Const.USER_NOT_FOUND)
                })
                .then(() => {
                    tokendao.resolveToken(user_id)
                    .then(data => {
                        if (data.length > 0) {
                            tokendao.updateToken(tokenModel.id, tokenModel.token)
                                .then(data => {
                                    resolve(tokenModel)
                                })
                        } else {
                            tokendao.createToken(tokenModel.id, tokenModel.token)
                                .then(data => {
                                    resolve(tokenModel)
                                })
                        }
                    })
                })
                .catch(err => {
                    console.error(err)
                    reject(Const.ERR_CODE)
                })
          

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