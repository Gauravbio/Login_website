const express=require("express");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv");
const cookieparser=require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookieparser());

dotenv.config({path:"./config.env"});

const route=require("./route");

app.use("/api",route);

module.exports=app;