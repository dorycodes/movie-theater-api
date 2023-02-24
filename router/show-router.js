const express = require('express')
const { Show } = require('../models/Show')
const router = express.Router()

router.route('/shows')
.get(async (req, res) => {
    try {
        let shows = await Show.findAll()
        res.send(shows)
    } catch (error) {
        res.send(error)
    }
} )
.post( async (req, res) => {
    const { title, genre, rating, status} = req.body
    const newShow = await Show.create({
        title, 
        genre,
        rating,
        status
    })
    res.send(newShow)
})

router.route('/shows/:id')
.get( async (req, res) => {
    try {
        let show = await Show.findByPk(req.params.id)
        res.send(show)
    } catch (error) {
        res.status(404).send('No show found')
    }
})
.put( async (req, res) => {
    const { title, genre, rating, status} = req.body
    const updatedShow = await Show.update({
        title,
        genre,
        rating,
        status
    },{
        where: {id: request.params.id}
    })
    res.send('Updated user')
})
.delete(async (req, res) => {
    try {
        let show = await Show.findByPk(req.params.id)
        if(!show) {
            res.status(404).send('Could not find show')
        }
        await show.destroy()
        res.send({message: 'Show successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})
router.get('/shows/:genre', async (req, res) => {
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
})
module.exports = router;