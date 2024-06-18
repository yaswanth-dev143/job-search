import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken"
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
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})
//compare password
userschema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}
//JSON WEBTOEKN
userschema.methods.createJWT = function (){
    return JWT.sign({userId:this._id},process.env.JWT_SECRECT, {expiresIn:"1d"});
}
export default mongoose.model('user', userschema);