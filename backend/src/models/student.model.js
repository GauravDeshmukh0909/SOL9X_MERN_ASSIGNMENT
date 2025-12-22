import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: String,
    email: String,
    course: String,
    enrollmentDate: {
      type: Date,
      default: Date.now
    }
  

},{timestamps:true})


export default mongoose.model("Student",studentSchema);