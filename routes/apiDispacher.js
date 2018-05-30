const express = require('express')
const router = express.Router()
const tokenRouter = require('./api/atoken')
router.get('/', function(req, res){
    console.log('here')
})

router.use('/token', tokenRouter)


module.exports = router