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
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleString()
    }
}, {
    toJSON: {
        getters: true,
        virtuals: true
    }
});

const EntryModel = model('entry', EntrySchema);
module.exports = EntryModel;