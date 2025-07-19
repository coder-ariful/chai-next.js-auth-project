import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mail.helper"

connectDB()
// Creating Methods
export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        const user = await User.findOne({ email });
        // checking is user already exist or not:
        if (user) {
            return NextResponse.json({ error: "User already Exist" }, { status: 400 })
        }

        //  creating hash password:
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // save in DataBase
        const newUser = new User(
            {
                username,
                email,
                password: hashedPassword
            }
        );

        const savedUser = await newUser.save();
        console.log(savedUser);
        // sending mail
        await sendEmail({ email, emailType: "verify",userId: savedUser._id})

        return NextResponse.json({
            message: "User Register Successfully .",
            success: true,
            error: false,
            savedUser
        })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: "there is something unknown error coming here." })
        }
        // return NextResponse.json({ error: error.message })
    }
}