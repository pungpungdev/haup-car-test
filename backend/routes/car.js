const express = require('express')
const router = express.Router()
const carControl = require('../control_function/car')

router.get('/', carControl.getAllCar);
router.get('/:id', carControl.getCarById);
router.post('/', carControl.createCar);
router.put('/:id', carControl.updateCar);
router.delete('/:id', carControl.deleteCar);

module.exports = router;