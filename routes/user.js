const express = require('express')
const router = express.Router()
const userService = require('../service/userService')

router.post('/login', function (req, res) {
    const user_service  = new userService()
    let username = req.body.username//param('username')
    let password = req.body.password// param('password')
    if(username && password){
        user_service.login(username, password)
            .then(data => {
                res.json({status: 1, result: data})
            })
            .catch(err => {
                res.json(err)
            })
    }else {
        res.json({status:0,result:'invalid username or password'})
    }
})

module.exports = router