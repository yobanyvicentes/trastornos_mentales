const {Router} = require('express');
const router = Router();

const {getAvailabilities, getAvailability, postAvailability, putAvailability} = require('../controllers/Availability');

router.get('/', getAvailabilities);
router.get('/:availabilityId', getAvailability);
router.post('/', postAvailability);
router.put('/:availabilityId', putAvailability);

module.exports = router;
