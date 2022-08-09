const express=require("express");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv");
const cookieparser=require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieparser());
if(process.env.NODE_ENV !== "production") {
    dotenv.config({path:"./config.env"});
}

const route=require("./route");

app.use("/api",route);
app.get('/',async (res)=> {
    res.status(200).json({
        message: "sahi to chal rhi hai"
    })
}) 

module.exports=app;