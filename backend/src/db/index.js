import mongoose from "mongoose"


const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect("mongodb+srv://dbuser:dbuserPassword@cluster0.eyhtkqb.mongodb.net/");
        console.log("mongodb connnected");
    } catch (error) {
        console.log("error in db connection "+error.message);
        process.exit(1)
        
    }

}

export default connectDB;