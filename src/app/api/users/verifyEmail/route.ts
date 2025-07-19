import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connectDB();
// creating login methods

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { token }= reqBody;
        console.log("This is token",token);
        //  find User 
        const user = await User.findOne({verifyToken : token, verifyTokenExpiry : {$gt : Date.now()}}) // means verifyToken same and within time
        console.log(user);
        if(!user) {
            return NextResponse.json({error : "Invalid Token"}, {status: 400})
        }
        // set is isVerify in models
            user.isVerify = true;
        // clear verifyToken and verifyTokenExpiry 
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        // save all change in DataBase;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully.",
            success: true,
            error: false
        },{status: 200})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: "there is something unknown error coming here." })
        }
    }
}