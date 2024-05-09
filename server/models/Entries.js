const { Schema, model } = require('mongoose');

const EntrySchema = new Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    definition: {
        type: String,
        required: true
    },
});

const EntryModel = model('entries', EntrySchema);
module.exports = EntryModel;