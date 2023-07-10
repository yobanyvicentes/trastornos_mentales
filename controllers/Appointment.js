const {request, response} = require('express');

const Appointment = require('../models/Appointment');

const mongoose = require('mongoose');

//listar disponibilidades
const getAppointments = async (req = request, res = response) => {
    try {
        const appointments = await Appointment.find().populate([
            {
                path: 'patient', select: 'name email'
            },
            {
                path: 'availability', select: 'user day month year time topic'
            },
        ]);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).send(error);
    }
}
//listar disponibilidad
const getAppointment = async (req = request, res = response) => {
    try {
        const id = req.params.appointmentId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de disponibilidad invalido');
        };
        const appointment = await Appointment.findById(id).populate([
            {
                path: 'patient', select: 'name email'
            },
            {
                path: 'availability', select: 'user day month year time topic'
            },
        ]);
        if(!appointment){
            return res.send('el usuario consultado no existe');
        };
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
}
//crear disponibilidad
const postAppointment = async (req = request, res = response) => {
    try {
        let appointment = '';
        appointment = await Appointment.findOne({
            patient: req.body.patient,
            availability: req.body.availability,
        });
        console.log('appointment:');
        console.log(appointment);
        if (appointment) {
            return res.status(400).json({
                msg: `ya existe un agendamiento con ese mismo especialista a esas horas en ese mismo día`
            })
        }
        console.log(req.body);
        appointment = new Appointment(req.body);
        appointment.creationDate = new Date;
        appointment.updateDate = new Date;

        appointmentSaved = await appointment.save();
        console.log(appointment);
        res.status(201).json(appointmentSaved);
    } catch (error) {
        res.status(400).send(error);
    }
}
//actualizar disponibilidad
const putAppointment = async (req = request, res = response) => {
    try {
        let id = req.params.appointmentId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de cita invalido');
        };
        let appointment = await Appointment.findById(id);
        if(!appointment){
            return res.send('la cita a editar no existe');
        };
        let exist = await Appointment.findOne({
            _id: {$ne: appointment._id},
            availability : req.body.availability,
            patient: req.body.patient,
        });
        if(exist){
            return res.status(400).send('esa misma disponibilidad ya está agendada, pruebe otro horario o fecha')
        }
        console.log('appointment:');
        console.log(appointment);

        appointment.availability = req.body.availability;
        appointment.patient = req.body.patient;
        console.log('2: \n'+ appointment);
        appointment.updateDate = new Date;
        console.log('3: \n'+ appointment);
        appointmentSaved = await appointment.save();
        console.log('4: \n'+ appointmentSaved);
        res.status(200).json(appointmentSaved);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getAppointments, getAppointment, postAppointment, putAppointment}
