const express = require('express')
const { User } = require('../models/User')
const router = express.Router()

router.route('/Users')
.get(async (req, res) => {
    try {
        let Users = await User.findAll()
        res.send(Users)
    } catch (error) {
        res.send(error)
    }
} )
.post( async (req, res) => {
    const { username, password } = req.body
    const newUser = await User.create({
        username,
        password
    })
})

router.route('/Users/:id')
.get( async (req, res) => {
    try {
        let User = await User.findByPk(req.params.id)
        res.send(User)
    } catch (error) {
        res.status(404).send('No User found')
    }
})
.put(async (req, res) => {
    const { username, password } = req.body
    const updatedUser = await User.update({
        username,
        password
    },{
        where: {id: request.params.id}
    })
    res.send('Updated user')
})
.delete(async (req, res) => {
    try {
        let User = await User.findByPk(req.params.id)
        if(!User) {
            res.status(404).send('Could not find User')
        }
        await User.destroy()
        res.send({message: 'User successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})
route.get('/shows/:genre', async (req, res) => {
    try {
        let show = await Show.findAll({
            where: {
                genre: req.params.genre
            }
        })
        res.send(show)
    } catch (error) {
        res.status(404).send('Show not found')
    }
    Show.findAll()
})
module.exports = router;