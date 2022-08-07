const app=require("./app");
const {connectDatabase}=require("./db");
connectDatabase();

app.listen(process.env.PORT,()=> {
    console.log(`server is listening at ${process.env.PORT}`);
})