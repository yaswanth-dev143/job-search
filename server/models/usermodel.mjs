import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is require']
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, 'Password is require'],
        minlength: [6, 'password length should be greater than 6 characters'],
    },
    location: {
        type: String,
        default: 'india',
    },
},
    { timestamps: true }
);
//middlewares
userschema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})
export default mongoose.model('user', userschema);