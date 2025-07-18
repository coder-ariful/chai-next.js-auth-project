// first install mongoose in terminal.

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, "please provide username..."],
        unique: [true, "place provide a unique username"]
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        require: [true, "please provide email..."],
        unique: [true, "place provide a unique email"]
    },
    password: {
        type: String,
        require: [true, "please provide email..."]
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String
}, { timeStamp: true })

export const User = mongoose.model("User", userSchema)
