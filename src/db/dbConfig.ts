import mongoose from "mongoose";

export const connectDB =  async ()=>{
    try {
        if(!process.env.MONGO_URI){
            return "there is a problem in env file"
        }
        mongoose.connect(process.env.MONGO_URI) // when you don't want right if state. then use :mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB is Connected");
        })
        connection.on("error",(err)=>{
            console.log("there is an Error in Connection DB. the Error : ",err);
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong in connecting to DB !!");
        console.log( "Error",error);
    }
}