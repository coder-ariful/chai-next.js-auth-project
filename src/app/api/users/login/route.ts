import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


connectDB();
// creating login methods

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody
        console.log(reqBody);

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist." }, { status: 404 })
        }

        console.log(user.email, "this user is exist.");

        // match the hash password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Password Don't Match !!!" }, { status: 401 })
        }

        // if password is matched then send server protection token (jwt => json web token)
        const tokenPayload = {   // tokenPayload or tokenData means mainly DATA.
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create jwt token
        // jwt.sign(tokenPayload, process.env.TOKEN_SECRET!) // ------------- or you maybe use this
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret || typeof tokenSecret !== "string") {
            return NextResponse.json({ error: "JWT secret is not defined on the server." }, { status: 500 });
        }
        const token = jwt.sign(tokenPayload, tokenSecret,{expiresIn : "1d"});

        const response = NextResponse.json({ message: "Login successful", success : true });

        // set token in cookies
        response.cookies.set("token" , token, {httpOnly : true})
        // return the response you want.
        return response

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: "there is something unknown error coming here." })
        }
    }
}