//importar express para crear la app a partir de una instancia de express
const express = require('express');
//crear la app a partir de express:
const app = express();
//importar dotenv para las variables de entorno
require('dotenv').config();
//puerto desde las variables de entorno
const port = process.env.PORT || 8080;
//importar la funcion getConnection de la carpeta db:
const {getConnection} = require('./database/connection');
//ejecutar la funcion de conección a la base de datos:
getConnection();
//importar cors para para que el front pueda acceder al back desde un servidor distinto
const cors = require('cors');

app.use(express.json());
app.use(cors());
// ------- rutas --------
app.use('/user', require('./routes/User'));

//-----levantar la aplicación------------
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});
