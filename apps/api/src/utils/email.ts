import nodemailer from "nodemailer"

interface SendEmailtypes {
    email: string
    subject: string
    message: string
}

export const sendEmail = ({ email, subject, message }: SendEmailtypes) => new Promise(async (resolve, reject) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL as string, pass: process.env.EMAIL_PASS as string }
        })
        await transport.sendMail({
            to: email,
            subject,
            html: message
        })
        resolve("email send success")
    } catch (error) {
        console.log(error)
        reject("unable to send email")
    }
})