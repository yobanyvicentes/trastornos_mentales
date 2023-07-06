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

    } catch (error) {
        res.status(500).send(error);
    }
}
//actualizar paciente
const putPatient = async (req = request, res = response) => {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getPatients, getPatient, postPatient, putPatient};
