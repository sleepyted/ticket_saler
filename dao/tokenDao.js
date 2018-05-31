const db = require('../db/base')

let tokenDao = function(){
    let self = this
    const sql  = {
        create : 'INSERT INTO t_token(user_id, token_str) VALUES(?, ?)',
        resolve: 'SELECT user_id, token_str, create_date, update_date FROM t_token WHERE user_id = ?',
        update: 'UPDATE t_token SET token_str = ? WHERE user_id = ?',
        delete: 'DELETE FROM t_token WHERE user_id = ?'
    }

    self._createToken = function(user_id, token_str){
        return db.executeQuery(sql.create, [user_id, token_str])
    }

    self._resolveToken = function(user_id){
        return db.executeQuery(sql.resolve, [user_id])
    }

    self._updateToken = function(user_id, token_str){
        return db.executeQuery(sql.update, [token_str, user_id])
    }

    self._deleteToken = function(user_id){
        return db.executeQuery(sql.delete, [user_id])
    }

    return {
        createToken: self._createToken,
        resolveToken: self._resolveToken,
        updateToken: self._updateToken,
        deleteToken: self._deleteToken
    }
}

module.exports = tokenDao