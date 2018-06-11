const express = require('express')
const router = express.Router()
const tokenRouter = require('./api/atoken')
const userRouter = require('./user')
const queryRouter = require('./api/query')

router.get('/', function(req, res){
    console.log('here')
})

router.use('/token', tokenRouter)
router.use('/user', userRouter)
router.use('/query', queryRouter)

module.exports = router