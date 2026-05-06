import { baseTemplate } from "./baseTemplate"

interface Visitortypes {
    name: string
    email: string
    subject: string
    message: string
}

export const visitorcontactTemplate = ({ name, email, subject, message }: Visitortypes) => {
    const content = `
        <h2>Contact Message Received</h2>

        <p>Hi ${name},</p>

        <p>Thank you for reaching out! Your message has been successfully sent to the profile user.</p>

        <p>Here are the details of your message:</p>

        <div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>

        <p>The user will review your message and get back to you as soon as possible.</p>

        <br/>

        <p>Thank you for contacting.</p>
        <p>Have a great day!</p>
    `

    return baseTemplate({
        title: "Contact Confirmation",
        content
    })
}