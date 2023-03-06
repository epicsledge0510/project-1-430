const express = require('express');
const router = express.Router()
const Exercise = require('../models/exercises')

//getting all exercises
router.get('/', async (request, response) => {
    try{
        const exercises = await Exercise.find()
        response.json(exercises);
    }
    catch (err){
        response.status(500).json({ message: err.message})
    }
})
//getting one exercise
router.get('/:id', (request, response) => {
    response.send(request.params.id)
})
//creating one exercise
router.post('/', async (request, response) => {
    const exercise = new Exercise({
        name: request.body.name, 
        exercise: request.body.exercise
    })
    try{
        const newExercise = await exercise.save()
        response.status(201).json(newExercise)
    }
    catch (err){
        response.status(400).json({ message: err.message})
    }
})

module.exports = router