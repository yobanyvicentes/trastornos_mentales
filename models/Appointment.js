const {Schema, model} = require('mongoose');

const AppointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    availability: {
        type: Schema.Types.ObjectId,
        ref: 'Availability',
        required: true,
    },
});

module.exports = model('Appointment', AppointmentSchema);
