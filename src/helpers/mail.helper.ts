import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: { email: string, emailType: string, userId: string }) => { // removed userId

    try {

        //create a token with bcryptjs
        const hashedToken = await bcrypt.hash(userId.toString(), 10)


        if (emailType === "verify") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 } // 1000 mi_second = 1second 
            )
        }
        else if (emailType === "Reset") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 } // 1000 mi_second = 1second 
            )
        }


        // Create a test account or replace with real credentials.
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "8f47cd3af7fa2b",
                pass: "350d0141078e4b"
            }
        });

        const mailOption = {
            from: 'john@sign.ai', // sender Email Address
            to: email, // list of receivers, like this: "one@parson.ai, two@parson.ai, three@parson.ai "
            subject: emailType === 'verify' ? "Verify Your Email" : "Reset Your Password", // email type 
            // text: "Hello world?", // plain‑text body
            html: `<p> click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "verify" ? "Verify Your Email" : "Reset Your Password"}
                or copy and paste the link below in your browser. </br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
            `, // HTML body
        }

        const mailResponse = await transport.sendMail(mailOption);

        return mailResponse;
    } catch (error: unknown) {
        console.log('Something went wrong in Sending Email !!!');
        console.log("SendEmail Error : ", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred while sending email.");
        }
    }
}