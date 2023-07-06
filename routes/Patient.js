const {Router} = require('express');
const router = Router();

const {getPatients, getPatient} = require('../controllers/Patient');

router.get('/', getPatients);
router.get('/:patientId', getPatient);

module.exports = router;
