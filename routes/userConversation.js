const prismaClient = require("../prisma/prisma");

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {

        const users = await prismaClient.userConversation.findMany({
            where: {}
        })
        return res.status(200).json(users)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {

        const user = await prismaClient.userConversation.findMany({
            where: {}
        })
        return res.status(200).json(user)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            const user = await prismaClient.userConversation.create({
                data: {
                },
            })
            return res.status(200).json(user)
        }

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {

        const user = await prismaClient.userConversation.delete({
            where: {Id: parseInt(id)}
        })
        return res.status(200).json(user)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await prismaClient.userConversation.update({
            where: {UserId: id},
            data: {
                DontSendToThis: req.body.DontSendToThis,
                SendOnlyToThis: req.body.SendOnlyToThis,
            }
        })
        return res.status(200).json(user)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router;
