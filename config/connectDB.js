const moongose =require("mongoose")


const connectDB=(uri)=>{
    return moongose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
}
module.exports = connectDB;