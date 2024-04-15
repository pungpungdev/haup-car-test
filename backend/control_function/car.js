const mySqlPool = require('../config/db')

const getAllCar = async (req,res) => {
    try{
        const queryText = 'SELECT * FROM all_cars WHERE is_del IS NULL OR is_del <> ?'
        const data = await mySqlPool.query(queryText,['Y'])
        if(data){
            res.status(200).json(data[0])
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "error in get all car api"
        })
    }


}

const getCarById = async (req,res) => {
    try{
        const targetId = req.params.id
        const queryText = 'SELECT * FROM all_cars WHERE id = ?'
        const data = await mySqlPool.query(queryText,[targetId])
        if(data){
            res.status(200).json(data[0])
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "error in get car by id api"
        })
    }
}

const createCar = async (req,res) => {
    try{
        const {registration, brand, model, description, remark} = req.body
        const queryText = 'INSERT INTO all_cars (registration, brand, model, description, remark) VALUES (?, ?, ?, ?, ?)'
        const data = await mySqlPool.query(queryText,[registration, brand, model, description, remark])
        if(data){
            res.status(201).send({
                message: "car created"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "error in create car api"
        })
    }
}

const updateCar = async (req,res) => {
    try{
        const targetId = req.params.id
        const {registration, brand, model, description, remark} = req.body
        const queryText = 'UPDATE all_cars SET registration = ?, brand = ?, model = ?, description = ?, remark = ? WHERE id = ?'
        const data = await mySqlPool.query(queryText,[registration, brand, model, description, remark, targetId])
        if(data){
            res.status(201).send({
                message: "car updated"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "error in update car api"
        })
    }
}

const deleteCar = async (req,res) => {
    try{
        const targetId = req.params.id
        const queryText = 'UPDATE all_cars SET is_del = ? WHERE id = ?'
        const data = await mySqlPool.query(queryText,['Y', targetId])
        if(data){
            res.status(201).send({
                message: "car deleted"
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({
            message: "error in delete car api"
        })
    }
}

module.exports = {
    getAllCar,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}