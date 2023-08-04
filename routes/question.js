const prismaClient = require("../prisma/prisma");

const express = require('express');
const router = express.Router();

router.get('/all',
    async function (req, res, next) {
        try {
            const questions = await prismaClient.question.findMany({
                where: {}})
            res.json(questions);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {

        const questions = await prismaClient.question.findMany({
            where: {QuestionCatalogId: parseInt(id)}
        })
        return res.status(200).json(questions)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            const question = await prismaClient.question.create({
                data: {
                    QuestionTitle: req.body.QuestionTitle ? req.body.QuestionTitle : null,
                    QuestionCatalogId: req.body.QuestionCatalogId ? parseInt(req.body.QuestionCatalogId) : null,
                    InputDateTimeUTC: new Date(),
                    Choices: req.body.Choices ? req.body.Choices : null
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

        const question = await prismaClient.question.delete({
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
        const question = await prismaClient.question.update({
            where: {Id: parseInt(id)},
            data: {
                QuestionTitle: req.body.QuestionTitle,
                Choices: req.body.Choices
            }
        })
        return res.status(200).json(question)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router;
