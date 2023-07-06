//importar request y response desde express
const {request, response} = require('express');
//importar modelo
const User = require('../models/User');
//importar mongoose para validaciones
const mongoose = require('mongoose');

//listar user
const getUser = async (req = request, res = response) => {
    try {
        // se valida que el id sea un id valido
        let id = req.params.userId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de usuario invalido');
        }
        //se valida si el user existe
        let user = await User.findById(req.params.userId);
        if(!user){
            return res.send('el usuario consultado no existe');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('error '+ error);
    }
};

//listar users
const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('hubo un error');
    }
};

//crear user
const postUser = async (req = request, res = response) => {
    try {
        //validar existencia user
        const userBD = await User.findOne({email: req.body.email});
        if (userBD) {
            return res.status(400).json({
                msg: `ya existe el usuario ${userBD.email}`
            })
        }
        //crear modelo de user
        const user = new User(req.body);
        user.creationDate = new Date;
        user.updateDate = new Date;
        //------------------------------------------------------------------------
        //guardar en bd el user
        const userSaved = await user.save();
        //retornar respuesta
        return res.status(201).json(userSaved);
    } catch (error) {
        console.log(error)
        return res.status(500).send("error en la creación del user").json();
    }
}

//editar user
const putUser = async (req = request, res = response) => {
    try {
        // validar que el id sea valido
        let id = req.params.userId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send('id de usuario invalido');
        }
        //se valida si el user no existe
        let user = await User.findById(req.params.userId);
        if(!user){
            return res.status(400).send('user no existe');
        }

        //si no entró en lo anterior, entonces si existe
        //entonces se valida que el nuevo email a poner (en caso de que lo modifique), no lo tenga otro user
        const emailExistente = await User.findOne({email: req.body.email, _id:{ $ne: user._id}});
        if(emailExistente){
            return res.status(400).send('el email ya está asignado a otro user distinto al que está intentando actualizar')
        }

        //setear los parámetros de la request a
        user.nombre = req.body.nombre;
        user.email = req.body.email;
        user.rol = req.body.rol;
        user.estado = req.body.estado;
        user.fechaActualizacion = new Date;
        //guardar en bd
        user = await user.save();

        res.send(user);
    } catch (error) {
        res.status(500).send('error')
    }
};


module.exports = {getUser, getUsers, postUser, putUser};
