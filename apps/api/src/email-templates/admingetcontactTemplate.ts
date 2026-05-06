import { baseTemplate } from "./baseTemplate"

interface Emailtypes {
    name: string
    email: string
    subject: string
    message: string
}

export const admingetcontactTemplate = ({ name, email, subject, message }: Emailtypes) => {

    const content = `
        <h2>New Contact Request Received</h2>

        <p>Hello Admin,</p>

        <p>You have received a new message from a visitor through your portfolio contact form.</p>

        <p><strong>Visitor Details:</strong></p>

        <div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>

        <br/>

        <p>Please review the message and respond to the visitor if necessary.</p>

        <p>Regards,<br/>Portfolio System</p>
    `

    return baseTemplate({
        title: "New Visitor Contact Message",
        content
    })
}