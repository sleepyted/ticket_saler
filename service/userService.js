const userDao = require('../dao/userDao')
const tokenService = require('./tokenService')
const Const = require('../common/const')

const userService = function () {

    let userdao = new userDao()
    let token = new tokenService()

    let self = this

    self._login = function (username, password) {
        let tokenModel = {}
        return new Promise(function (resolve, reject) {
            return userdao.resolveUserByNamePwd(username, password)
        })
            .then(data => {
                if (data.length !== 0) {
                    return token.createToken(data[0].id)
                } else {
                    reject(Const.USER_NOT_FOUND)
                }
            })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                console.log(err)
                reject(Const.ERR_CODE)
            })
    }

    return {
        login: self._login,
    }
}

module.exports = userService