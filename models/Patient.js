const {Schema, model} = require('mongoose')

const PatientSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
        enum:['Activo', 'Inactivo'],
    },
    creationDate:{
        type: Date,
        required: true,
    },
    updateDate:{
        type: Date,
        required: true,
    },
});

module.exports = model('Patient', PatientSchema);
