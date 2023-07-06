const {Router} = require('express');
const router = Router();

const {getPatients, getPatient, postPatient, putPatient} = require('../controllers/Patient');

router.get('/', getPatients);
router.get('/:patientId', getPatient);
router.post('/', postPatient);
router.put('/:patientId', putPatient);

module.exports = router;
