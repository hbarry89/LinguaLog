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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
});

const EntryModel = model('entry', EntrySchema);
module.exports = EntryModel;