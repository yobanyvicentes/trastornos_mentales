//importar Schema y model
const {Schema, model} = require('mongoose')
//crear el modelo UsuariosSchema:
const UserSchema = new Schema({
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
    role:{
        type: String,
        required: true,
        enum:['especialista', 'admin'],
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
module.exports = model('User', UserSchema);
