const db = require('./db/base')

let userDao = function(){
    let self = this
    const sql  = {
        create : 'INSERT INTO t_user(username, password, tel) VALUES(?,?,?)',
        resolve: 'SELECT id, username, tel, update_date, create_date FROM t_user WHERE id = ? AND del_flag != `0`',
        //TODO finish user sql
        update: '',
        delete: ''
    }

    self._createUser = function(username, password, tel){
        return db.executeQuery(sql.create, [username, password, tel])
    }

    self._resolveUser = function(user_id){
        return db.executeQuery(sql.resolve, [user_id])
    }

    // self._updateUser = function(user_id, token_str){
    //     return db.executeQuery(sql.update, [token_str, user_id])
    // }

    // self._deleteUser = function(user_id){
    //     return db.executeQuery(sql.delete, [user_id])
    // }

    return {
        createUser: self._createUser,
        resolveUser: self._resolveUser,
        // updateUser: self._updateUser,
        // deleteUser: self._deleteUser
    }
}

module.exports = userDao