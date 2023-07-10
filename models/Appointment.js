const {Schema, model} = require('mongoose');

const AppointmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    date:{
        required: true,
        date: {
            day: {
                type: Number,
                required: true,
                min:1,
                max:31,
            },
            month: {
                type: Number,
                required: true,
                min: 1,
                max: 12,
            },
            year: {
                type: Number,
                required: true,
                enum: [2023],
            },
        },
    },
    time:{
        type: Number,
        enum: ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']
    },
});

module.exports = model('Appointment', AppointmentSchema);
