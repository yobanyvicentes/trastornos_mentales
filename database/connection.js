//importar mongoose:
const mongoose = require('mongoose');
//importar dotenv para las variables de entorno
require('dotenv').config();
//crear funcion getConnection asincrona:
const getConnection = async () => {
    try {
        const url = process.env.url;
        await mongoose.connect(url);
        console.log('conexion exitosa');
    } catch (error) {
        console.log('error en la conexion');
    }
}

//permitir exportar la función:
module.exports = {
    getConnection,
}
