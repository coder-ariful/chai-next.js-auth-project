import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: { email: string,emailType: string, userId: string }) => {
    try {
        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOption = {
            from: 'john@sign.ai', // sender Email Address
            to: email, // list of receivers, like this: "one@parson.ai, two@parson.ai, three@parson.ai "
            subject: emailType === 'verify'? "Verify Your Email" : "Reset Your Password", // email type 
            // text: "Hello world?", // plain‑text body
            html: "<b>Hello world?</b>", // HTML body
        }

        const mailResponse = await transporter.sendMail(mailOption);

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