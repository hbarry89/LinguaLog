const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers.'],
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    entries: [
        {
          type: Schema.Types.ObjectId,
          ref: 'entry'
        }
      ],
})

const UserModel = model("user", UserSchema)
module.exports = UserModel