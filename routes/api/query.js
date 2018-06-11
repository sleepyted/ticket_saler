const express = require('express')
const router = express.Router()
const db = require('../../db/base')

router.post('/', function (req, res) {

    console.log(req.body)
    let sql = req.body.sql
    if (sql) {
        db.executeQuery(sql, [])
            .then(data => {
                if (!data.errno) {
                    res.json({ status: 1, result: data })
                } else {
                    res.json({ status: 0, result: data })
                }
            })
            .catch(err => {
                res.json({ status: 0, result: err })
            })
    }
    // res.json(result)
})

module.exports = router