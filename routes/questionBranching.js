const prismaClient = require("../prisma/prisma");

const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {

        const questions = await prismaClient.questionBranching.findMany({
            where: {QuestionId: parseInt(id)}
        })
        return res.status(200).json(questions)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            const question = await prismaClient.questionBranching.create({
                data: {
                    QuestionTitle: req.body.QuestionTitle ? req.body.QuestionTitle : null,
                    QuestionId: req.body.QuestionId ? parseInt(req.body.QuestionId) : null,
                    AnswerType: req.body.AnswerType ? req.body.AnswerType : null,
                    InputDateTimeUTC: new Date(),
                },
            })
            return res.status(200).json(question)
        }

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {

        const question = await prismaClient.questionBranching.delete({
            where: {Id: parseInt(id)}
        })
        return res.status(200).json(question)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const question = await prismaClient.questionBranching.update({
            where: {Id: parseInt(id)},
            data: {
                QuestionTitle: req.body.QuestionTitle,
                AnswerType: req.body.AnswerType,
            }
        })
        return res.status(200).json(question)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router;
