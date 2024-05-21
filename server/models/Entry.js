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
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleString()
    },
    byUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    toJSON: {
        getters: true,
        virtuals: true
    }
});

const EntryModel = model('entry', EntrySchema);
module.exports = EntryModel;