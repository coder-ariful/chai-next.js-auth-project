import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
// import User from "@/models/user.model";

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || "";
        if (!token) {
            throw new Error("There is no token . it is Error.")
        }
        // then create token to Decoded...
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;
        console.log(decodedToken);
        if (typeof decodedToken === "object" && decodedToken !== null && "id" in decodedToken) {
            return (decodedToken as jwt.JwtPayload).id;
        }
        throw new Error("Token payload does not contain 'id'.");



        // ================ middle option ======================
        // const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;
        // if (!decoded?.id) throw new Error("Token invalid");

        // const user = await User.findById(decoded.id).select("-password");
        // if (!user) throw new Error("User not found (possibly deleted)");

        // return user;

        // =============== last option ===================
        // return decodedToken.id

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            console.log('there is something unknown error coming here.go and check. ');
        }
    }
}
