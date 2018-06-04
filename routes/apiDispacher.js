const express = require('express')
const router = express.Router()
const tokenRouter = require('./api/atoken')
const userRouter = require('./user')

router.get('/', function(req, res){
    console.log('here')
})

router.use('/token', tokenRouter)
router.use('/user', userRouter)

module.exports = router