const mongoose=require("mongoose");

exports.connectDatabase=()=> {
    mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=> {
    console.log("database connected");
  }).catch((err)=> {
    console.log(`error occured ${err}`);
  });
}