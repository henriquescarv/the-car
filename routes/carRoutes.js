const Car = require('../models/Car')
const router = require('express').Router()

//Criação de dados:
router.post('/', async(req, res) => {
    const {placa, ano, modelo, aluguel} = req.body
    const car = {placa, ano, modelo, aluguel}

    try {
        await Car.create(car)
        res.status(201).json({message: 'Carro cadastrado no sistema com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async(req,res) => {
    try {
        const car = await Car.find()
        res.status(200).json(car)
    } catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/:id', async(req,res) => {
    const id = req.params.id

    try {
        const car = await Car.findOne({_id: id})

        if(!car) {
            res.status(422).json({message:"O carro não foi encontrado!"})     //tratamento de erro
            return
        }

        res.status(200).json(car)

    } catch(error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async(req,res) => {
    const id = req.params.id

    const {placa, ano, modelo, aluguel} = req.body
    const car = {placa, ano, modelo, aluguel}

    try {
        const updatedCar = await Car.updateOne({_id:id}, car)
        if (updatedCar.matchedCount === 0) {
            res.status(422).json({message:"O carro não foi encontrado!"})
            return
        }

        res.status(200).json(car)

    } catch(error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async(req,res) => {
    const id = req.params.id
    const car = await Car.findOne({_id:id})

    if(!car) {
        res.status(422).json({message:"O carro não foi encontrado!"})
        return
    }

    try {
        await Car.deleteOne({_id:id})

        res.status(200).json({message: 'Carro removido do sistema!'})
    } catch(error) {
        res.status(500).json({error: error})
    }
})

module.exports = router