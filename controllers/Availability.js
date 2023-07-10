const {request, response} = require('express');

const Availability = require('../models/Availability');

const mongoose = require('mongoose');

//listar disponibilidades
const getAvailabilities = async (req = request, res = response) => {
    try {
        const availabilities = await Availability.find().populate([
            {
                path: 'user', select: 'name email'
            }
        ]);
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(500).send(error);
    }
}
//listar disponibilidad
const getAvailability = async (req = request, res = response) => {
    try {
        const id = req.params.availabilityId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de disponibilidad invalido');
        };
        const availability = await Availability.findById(id);
        if(!availability){
            return res.send('el usuario consultado no existe');
        };
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).send(error);
    }
}
//crear disponibilidad
const postAvailability = async (req = request, res = response) => {
    try {
        let availability = '';
        availability = await Availability.findOne({
            user: req.body.user,
            date: req.body.date,
            time: req.body.time,
        });
        console.log('2'+ availability);
        if (availability) {
            return res.status(400).json({
                msg: `ya existe la disponibilidad de ese especialista para el día ${availability.date}, a las ${availability.time} horas`
            })
        }
        console.log(req.body);
        availability = new Availability(req.body);
        availability.creationDate = new Date;
        availability.updateDate = new Date;

        availabilitySaved = await availability.save();
        console.log(availability);
        res.status(201).json(availabilitySaved);
    } catch (error) {
        res.status(400).send(error);
    }
}
//actualizar disponibilidad
const putAvailability = async (req = request, res = response) => {
    try {
        let id = req.params.availabilityId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de disponibilidad invalido');
        };
        let availability = await Availability.findById(id);
        if(!availability){
            return res.send('la disponibilidd consultada no existe');
        };
        let exist = await Availability.findOne({
            _id: {$ne: availability._id},
            user: req.body.user,
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
            time: req.body.time,
        });
        if(exist){
            return res.status(400).send('esa misma disponibilidad ya existe, pruebe otro horario o fecha')
        }
        console.log('1: \n'+ availability);

        availability.user = req.body.user;
        availability.day = req.body.day;
        availability.month = req.body.month;
        availability.year = req.body.year;
        availability.time = req.body.time;
        availability.topic = req.body.topic;
        console.log('2: \n'+ availability);
        availability.updateDate = new Date;
        console.log('3: \n'+ availability);
        availabilitySaved = await availability.save();
        console.log('4: \n'+ availabilitySaved);
        res.status(200).json(availabilitySaved);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getAvailabilities, getAvailability, postAvailability, putAvailability}
