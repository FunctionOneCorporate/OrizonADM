const prismaClient = require("../prisma/prisma");

const express = require('express');
const router = express.Router();

router.get('/all',
    async function (req, res, next) {
        try {
            const questions = await prismaClient.questionCatalog.findMany({
                where: {},
            })

            res.json(questions);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            const questionCatalog = await prismaClient.questionCatalog.create({
                data: {
                    CatalogName: req.body.CatalogName ? req.body.CatalogName : null,
                    Description: req.body.Description ? req.body.Description : null,
                    InputDateTimeUTC: new Date(),
                    MinParticipantsToSend: req.body.MinParticipantsToSend ? parseInt(req.body.MinParticipantsToSend) : null,
                    StartDateTimeUTC: req.body.StartDateTimeUTC ? req.body.StartDateTimeUTC : new Date(),
                    Status: "A"
                },
            })
            return res.status(200).json(questionCatalog)
        }

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {

        const questionCatalog = await prismaClient.questionCatalog.delete({
            where: {Id: parseInt(id)}
        })
        return res.status(200).json(questionCatalog)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const questionCatalog = await prismaClient.questionCatalog.update({
            where: {Id: parseInt(id)},
            data: {
                CatalogName: req.body.CatalogName ,
                Description: req.body.Description ,
                InputDateTimeUTC: new Date(),
                MinParticipantsToSend: parseInt(req.body.MinParticipantsToSend),
                StartDateTimeUTC: req.body.StartDateTimeUTC,
                Status: req.body.Status
            }
        })
        return res.status(200).json(questionCatalog)


    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

module.exports = router;
