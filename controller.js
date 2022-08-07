const User=require("./user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const generateToken=(id)=> {
    return jwt.sign({_id:id},process.env.privateKey);
}

exports.signup=async (req,res)=> {
    const {name,password,email}=req.body;

    const user=await User.create({
        name,
        email,
        password
    });
    const token=await generateToken(user._id);

    res.status(201).json({
        success:true,
        user,
        token,
    })
}

exports.login=async (req,res)=> {
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user) {
        res.status(400).json({
            success:true,
            message:"user not exist"
        })
    }

    let checkPassword=await bcrypt.compare(password,user.password);

    if(!checkPassword) {
        res.status(400).json({
            success:false,
            message:"user not exist"
        })
    }
    else {
        const token=await generateToken(user._id);

        const options={
            expiresIn:new Date(Date.now()+ 24*60*60*1000),
            httpOnly:true,
        }

        res.status(200).cookie("token",token,options).json({
            success:true,
            user,
        })
    }
    
}