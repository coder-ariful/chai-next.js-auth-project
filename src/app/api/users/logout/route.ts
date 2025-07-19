import { connectDB } from "@/db/dbConfig";
import {NextResponse } from "next/server";


connectDB();
// creating login methods

export const GET = async () => {
    try {
        const response = NextResponse.json({
            message : "User Successfully Logout.", 
            success: true,
            error: false
        })

        // Clear cookies here.
        response.cookies.set('token', '', {httpOnly: true, expires : new Date(0)});

        return response
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: "there is something unknown error coming here." })
        }
    }
}