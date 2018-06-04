const express = require('express')
const router = express.Router()
const userService = require('../service/userService')

router.get('/login', function (req, res) {
    const user_service  = new userService()
    let username = req.param('username')
    let password = req.param('password')
    if(username && password){
        user_service.login(username, password)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    }else {
        res.json({status:0,result:'invalid username or password'})
    }
})

module.exports = router