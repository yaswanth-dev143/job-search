import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt js";
import JWT from 'jsonwebtoken'
//schema
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "name is require"],
        },
        lastname:{
            type:String,
        },
        email: {
            type: String,
            required:[true, "email is require"],
            unique: true,
            validate:validator.isEmail,
        },
        password:{
            type:String,
            required: [true, "password is require"],
            minlength: [6, "Password length should be greater than 6 character"],
        },
        location:{
            type:String,
            default: "india",
        },
    },
    { timestamps:true }
);
//middlewares
userSchema.pre("save",async function(){
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});


//JSON WEBTOKENS
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},)
}
export default mongoose.model("User",userSchema);