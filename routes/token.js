const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next){
    res.render('token')
})

router.get('/')

module.exports = router