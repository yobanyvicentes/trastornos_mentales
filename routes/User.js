//importar Router desde express
const {Router} = require('express');
const router = Router();
//importar funciones
const {getUser, getUsers, postUser, putUser} = require('../controllers/User')

//listar un usuario
router.get('/:userId', getUser);
//listar todos
router.get('/', getUsers);
//crear
router.post('/', postUser);
//actualizar
router.put('/:userId',  putUser);


module.exports = router;
