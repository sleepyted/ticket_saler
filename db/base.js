/**
 * Created by matengfei1 on 2018/2/5.
 */
const mysql = require('mysql')
const config = require('./config')
const databaseBaseOprator = function () {

    let self = this
    /**
     * flag of the connection status
     * @type {boolean} true: connection available, false: connection lost
     * @private
     */
    self._connectionFlag = false
    let pool
    self._connect = function () {
        console.log('DBUtol _conect use config.mysql');
        console.log(config.mysql);
        
        pool = mysql.createPool(config.mysql)
        self._connectionFlag = true
    }

    /**
     * execute query sql and return a promise
     * @param sql
     * @param options the query options
     * @returns {Promise} resolved : the result, rejected: error occurred
     * @private
     */
    self._query = function (sql, options) {
        if(!self._connectionFlag){
            console.log('DDUtil-_query call _connect here');
            self._connect()
        }
        console.log('DDUtil-_query execute sql = ' + sql);

        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                }
                else {
                    connection.query(sql, options, function (error, results, fields) {
                        connection.release();
                        if (error) reject(error)
                        resolve(results)
                    })
                }
            })
        })

    }

    /**
     * disconnect and close the pool
     * @private
     */
    self._disconnect = function () {
        console.log('DBUtil _disconnect');
        
        if (pool) pool.end()
        self._connectionFlag = true
    }

    return {
        connect: self._connect,
        disconnect:self._disconnect,
        executeQuery:self._query
    }
}

let instance = new databaseBaseOprator()
module.exports = instance
// let getInstance = function(){
//     if(instance == null){
//         console.log('getInstance call new DBUtil')
//         instance = new DbUtil()
//     }
//     return instance
// }
// module.exports = getInstance