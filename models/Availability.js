const {Schema, model} = require('mongoose');

const AvailabilitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    day:{
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    month:{
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year:{
        type: Number,
        required: true,
        enum: [2023, 2024]
    },
    time:{
        required: true,
        type: String,
        enum: ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']
    },
    topic:{
        required: true,
        type: String,
    },
    creationDate:{
        type: Date,
        required: true,
    },
    updateDate:{
        type: Date,
        required: true,
    },
});

module.exports = model('Availability', AvailabilitySchema);
