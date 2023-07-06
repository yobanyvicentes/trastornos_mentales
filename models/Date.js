const {Schema, model} = require('mongoose');

const DateSchema = new Schema({
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
});

module.exports = model('Date', DateSchema);
