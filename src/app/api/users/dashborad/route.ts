import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken.helper";


connectDB();
// creating login methods

export const GET = async (request: NextRequest) => {
    try {
        // extract data from token
        const userId = await getDataFromToken(request)
        await getDataFromToken(request)
        if (!userId) {
            throw new Error("There is no userId in GetDataFromToken.")
        }

        console.log("userId is here", userId);
        // now find the user in database
        const user = await User.findOne({ _id: userId }).select("-password");
        console.log("User is here :", user);

        if (!user) {
            throw new Error('There is not find from tokenId . there is an Error.')
        }

        // =============== middle option ===================
        // await getDataFromToken(request)

        return NextResponse.json({
            message: "User Founded",
            success: true,
            error: false
        })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: "there is something unknown error coming here." })
        }
    }
}