const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers.']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})

const UserModel = model("users", UserSchema)
module.exports = UserModel