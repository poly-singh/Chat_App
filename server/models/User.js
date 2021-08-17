const { Schema, model } = require('mongoose');
// Use Bcrypt for hashing passwords.
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            min: 4,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: '',
        }
    }
);

const User = model('User', UserSchema);
module.exports = User;