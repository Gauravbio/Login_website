const mongoose=require("mongoose");
const {Schema}=require("mongoose");
const bcrypt=require("bcrypt");

const user=new Schema({
    name: {
        type: String,
        required:[true,"please enter your name"],
        maxLength:[100,"name cannot exceed 100 characters"],
    },
    email:{
        type: String,
        required:[true,"please enter email"],
        unique:[true,"email already exists"]
    },
    password:{
        type: String,
        required:[true,"please enter your password"],
        minLength:[8,"password should be more than 8 characters"]
    }
});

user.pre('save',async function hashpassword(next) {
    if(this.isModified("password")) {
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
});
module.exports=mongoose.model("User",user);