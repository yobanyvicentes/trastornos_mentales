const {request, response} = require('express');

const Patient = require('../models/Patient');

//importar mongoose para validaciones
const mongoose = require('mongoose');

// listas pacientes
const getPatients = async (req = request, res = response) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).send(error);
    }
}
//listar un paciente
const getPatient = async (req = request, res = response) => {
    try {
        let id = req.params.patientId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de paciente invalido');
        }
        const patient = await Patient.findById(req.params.patientId)
        if(!patient){
            return res.status(400).send("el paciente no existe");
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).send(error);
    }
}
//crear un paciente
const postPatient = async ( req = request, res = response) => {
    try {
        //validar existencia del paciente
        const isPatient = await Patient.findOne({email: req.body.email});
        if (isPatient) {
            return res.status(400).json({
                msg: `ya existe el paciente con email ${isPatient.email}`
            })
        }
        //crear modelo del paciente
        const patient = new Patient(req.body);
        patient.creationDate = new Date;
        patient.updateDate = new Date;
        //guardar en bd el paciente
        const patientSaved = await patient.save();
        //retornar respuesta
        res.status(201).json(patientSaved);
    } catch (error) {
        res.status(500).send(error);
    }
}
//actualizar paciente
const putPatient = async (req = request, res = response) => {
    try {
        // validar que el id sea valido
        let id = req.params.patientId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de paciente invalido');
        }
        //se valida si el patient no existe
        let patient = await Patient.findById(req.params.patientId);
        if(!patient){
            return res.status(400).send('el paciente a actualizar no existe');
        }

        //si no entró en lo anterior, entonces si existe
        //entonces se valida que el nuevo email a poner (en caso de que lo modifique), no lo tenga otro patient
        const emailExist = await Patient.findOne({email: req.body.email, _id:{ $ne: patient._id}});
        if(emailExist){
            return res.status(400).send('el email ya está asignado a otro paciente distinto al que está intentando actualizar')
        }
        //setear los parámetros de la request:
        patient.name = req.body.name;
        patient.email = req.body.email;
        patient.password = req.body.password;
        patient.state = req.body.state;
        patient.updateDate = new Date;
        //guardar en bd
        patient = await patient.save();

        res.status(201).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getPatients, getPatient, postPatient, putPatient};
