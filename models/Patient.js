const {Schema, model} = require('mongoose')

const PatientSchema = new Schema({
    //crear los atributos:
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
//exportar el modelo
module.exports = model('Patient', PatientSchema);
