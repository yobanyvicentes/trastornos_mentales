const {Schema, model} = require('express');

const AvailabilitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date:{
        type: Schema.Types.Date,
        ref: 'Date',
        required: true,
    },
    time:{
        type: Number,
        enum: ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']
    },
});

module.exports = model('Availability', AvailabilitySchema);
