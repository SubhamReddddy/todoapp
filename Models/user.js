import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const userModel = mongoose.model("User",userSchema);  // User is used as ref in other schema