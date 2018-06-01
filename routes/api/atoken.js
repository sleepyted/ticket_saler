const express = require('express')
const router = express.Router()
const tokenService = require('../../service/tokenService')

router.get('/', function(req, res){
    let ts = new tokenService()
    ts.createToken(2)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    // res.json(result)
})

module.exports = router