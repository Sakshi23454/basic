import db from "../config/db"
import { Request, Response } from "express"
import { education, experience, project, skills, profile, contact, stats } from "../models"
import { CONTACT_FORM_REQUEST, CONTACT_FORM_RESPONSE, EDUCATION_GET_REQUEST, EDUCATION_GET_RESPONSE, EXPERIENCE_GET_REQUEST, EXPERIENCE_GET_RESPONSE, GET_SKILLS_REQUEST, GET_SKILLS_RESPONSE, GET_STATS_REQUEST, GET_STATS_RESPONSE, PROFILE_GET_REQUEST, PROFILE_GET_RESPONSE, PROJECT_GET_REQUEST, PROJECT_GET_RESPONSE } from "@repo/types"
import { eq } from "drizzle-orm"
import { isEmail, isEmpty } from "validator"
import { sendEmail } from "../utils/email"
import { visitorcontactTemplate } from "../email-templates/visitorcontactTemplate"
import { admingetcontactTemplate } from "../email-templates/admingetcontactTemplate"

export const getProjects = async (req: Request<{}, {}, PROJECT_GET_REQUEST>, res: Response<PROJECT_GET_RESPONSE>) => {
    try {
        const result = await db.select({
            id: project.id,
            title: project.title,
            description: project.description,
            image: project.image,
            githublink: project.githubLink,
            livelink: project.liveLink,
            skills: project.skills
        }).from(project)
        return res.status(200).json({ message: "Projects fetch success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Unable to fetch projects" })
    }
}


export const getSkills = async (req: Request<{}, {}, GET_SKILLS_REQUEST>, res: Response<GET_SKILLS_RESPONSE>) => {
    try {
        const result = await db.select().from(skills)
        if (!result) {
            return res.status(404).json({ message: "No skills found" })
        }
        return res.status(200).json({ message: "skills read success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to read skills" })
    }
}


export const getExperience = async (req: Request<{}, {}, EXPERIENCE_GET_REQUEST>, res: Response<EXPERIENCE_GET_RESPONSE>) => {
    try {
        const result = await db.select().from(experience)
        return res.status(200).json({ message: "experience fetch success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to fetch experience" })
    }
}


export const getEducation = async (
    req: Request<{}, {}, EDUCATION_GET_REQUEST>,
    res: Response<EDUCATION_GET_RESPONSE>
) => {
    try {
        const result = await db.select().from(education)
        return res.status(200).json({ message: "education fetch success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to fetch education" })
    }
}


export const getProfile = async (
    req: Request<{}, {}, PROFILE_GET_REQUEST>,
    res: Response<PROFILE_GET_RESPONSE>
) => {
    try {
        const result = await db
            .select({
                id: profile.id,
                name: profile.name,
                title: profile.title,
                email: profile.email,
                mobile: profile.mobile,
                bio: profile.bio,
                ProfilePic: profile.profilePic,
                resume: profile.resume,
                github: profile.github,
                linkedin: profile.linkedin,
                location: profile.location,
            })
            .from(profile).where(eq(profile.role, "user"))
        const user = result[0]
        if (!user) {
            return res.status(400).json({ message: "profile not found" })
        }
        return res.status(200).json({
            message: "profile fetch success", result: {
                id: user.id,
                name: user.name as string,
                title: user.title as string,
                email: user.email,
                mobile: user.mobile as string,
                bio: user.bio as string,
                ProfilePic: user.ProfilePic as string,
                resume: user.resume as string,
                github: user.github as string,
                linkedin: user.linkedin as string,
                location: user.location as string,
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "unable to fetch profile",
        })
    }
}


export const addcontactForm = async (
    req: Request<{}, {}, CONTACT_FORM_REQUEST>,
    res: Response<CONTACT_FORM_RESPONSE>
) => {
    try {
        const { name, email, subject, message } = req.body
        if (isEmpty(name) || isEmpty(email) || isEmpty(subject) || isEmpty(message)) {
            return res.status(400).json({ message: "all fields are required" })
        }
        if (!isEmail(email)) {
            return res.status(400).json({ message: "invalid email" })
        }
        await db.insert(contact).values({name, email, subject, message})        
        // confirmation mail to visitor
        await sendEmail({
            email: email,
            subject: "Contact Confirmation",
            message: visitorcontactTemplate({
                name,
                email,
                subject,
                message
            })
        })
        // notification mail to admin
        await sendEmail({
            email: process.env.ADMIN_EMAIL as string,
            subject: "New Contact Message",
            message: admingetcontactTemplate({
                name,
                email,
                subject,
                message
            })
        })
        res.status(200).json({ message: "message sent successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to send message" })
    }
}


export const viewStats = async (
    req: Request<{}, {}, GET_STATS_REQUEST>,
    res: Response<GET_STATS_RESPONSE>
) => {
    try {
        const [result] = await db.select().from(stats).limit(1)
        if (!result) {
            return res.status(500).json({ message: "no data" })
        }
        return res.status(200).json({ message: "Stats fetched successfully", 
            result: {
                experience: result.experience,
                projects: result.projects,
                technologies: result.technologies,
                clients: result.clients,
            }})
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error.message || "unable to fetch stats" })
    }
}