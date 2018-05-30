const express = require('express')
const router = express.Router()
const TokenManager = require('../../common/token')
const tm = new TokenManager()

router.get('/', function(req, res){
    res.json(tm.createToken(1))
})

module.exports = router