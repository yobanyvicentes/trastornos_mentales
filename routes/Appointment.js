const {Router} = require('express');
const router = Router();

const {getAppointments, getAppointment, postAppointment, putAppointment} = require('../controllers/Appointment');

router.get('/', getAppointments);
router.get('/:appointmentId', getAppointment);
router.post('/', postAppointment);
router.put('/:appointmentId', putAppointment);

module.exports = router;
