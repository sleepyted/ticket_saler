const express = require('express')
const router = express.Router()
const tokenService = require('../../service/tokenService')

router.get('/', function(req, res){
    let ts = new tokenService()
    let result = ts.createToken(1)
    res.json(result)
})

module.exports = router