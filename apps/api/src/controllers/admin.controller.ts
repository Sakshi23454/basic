import { ADD_PROFILEPIC_REQUEST, ADD_PROFILEPIC_RESPONSE, EDUCATION_CREATE_REQUEST, EDUCATION_CREATE_RESPONSE, EDUCATION_DELETE_REQUEST, EDUCATION_DELETE_RESPONSE, EDUCATION_READ_REQUEST, EDUCATION_READ_RESPONSE, EDUCATION_UPDATE_REQUEST, EDUCATION_UPDATE_RESPONSE, EXPERIENCE_CREATE_REQUEST, EXPERIENCE_CREATE_RESPONSE, EXPERIENCE_DELETE_REQUEST, EXPERIENCE_DELETE_RESPONSE, EXPERIENCE_READ_REQUEST, EXPERIENCE_READ_RESPONSE, EXPERIENCE_UPDATE_REQUEST, EXPERIENCE_UPDATE_RESPONSE, GET_CONTACT_REQUSET, GET_CONTACT_RESPONSE, PROFILE_READ_REQUEST, PROFILE_READ_RESPONSE, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESPONSE, PROJECT_CREATE_REQUEST, PROJECT_CREATE_RESPONSE, PROJECT_DELETE_REQUEST, PROJECT_DELETE_RESPONSE, PROJECT_READ_REQUEST, PROJECT_READ_RESPONSE, PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_RESPONSE, READ_SKILLS_REQUEST, READ_SKILLS_RESPONSE, READ_STATS_REQUEST, READ_STATS_RESPONSE, RESUME_UPLOAD_REQUEST, RESUME_UPLOAD_RESPONSE, SKILL_CREATE_REQUEST, SKILL_CREATE_RESPONSE, SKILL_DELETE_REQUEST, SKILL_DELETE_RESPONSE, STATS_CREATE_REQUEST, STATS_CREATE_RESPONSE } from "@repo/types";
import bcryptjs from "bcryptjs";
import path from "path";
import { isURL } from "validator";
import db from "../config/db";
import { education, experience, project, skills, profile, contact, stats } from "../models";
import { Request, Response } from "express";
import { desc, eq } from "drizzle-orm";
import { resumeprofileUpload } from "../utils/upload";
import cloud from "../utils/cloud";


interface MulterRequest extends Request<any, {}, ADD_PROFILEPIC_REQUEST> {
    file: Express.Multer.File
}

interface UserUpdateMulterRequest extends Request<any, {}, PROFILE_UPDATE_REQUEST> {
    file: Express.Multer.File
}

interface AddResumeMulterRequest extends Request<any, {}, RESUME_UPLOAD_REQUEST> {
    file: Express.Multer.File
}


export const addProject = async (req: Request<{}, {}, PROJECT_CREATE_REQUEST>, res: Response<PROJECT_CREATE_RESPONSE>) => {
    try {
        const { title, description, skills, githublink, livelink, image } = req.body
        if (!title || !description || !skills || !githublink || !livelink || !image) {
            return res.status(400).json({ message: "All fields required" })
        }
        await db.insert(project).values({
            title,
            description,
            skills,
            githubLink: githublink,
            liveLink: livelink,
            image
        })
        return res.status(200).json({ message: "Project added successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Unable to add project" })
    }
}

export const readProjects = async (req: Request<{}, {}, PROJECT_READ_REQUEST>, res: Response<PROJECT_READ_RESPONSE>) => {
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

export const updateProject = async (req: Request<{ pid: number }, {}, PROJECT_UPDATE_REQUEST>, res: Response<PROJECT_UPDATE_RESPONSE>) => {
    try {
        const { pid } = req.params
        if (!pid) {
            return res.status(400).json({ message: "Invalid project id" })
        }
        const { title, description, skills, githublink, livelink, image } = req.body
        let obj: any = {}
        if (title) obj.title = title
        if (description) obj.description = description
        if (skills) {
            if (!Array.isArray(skills)) {
                return res.status(400).json({ message: "Skills must be array" })
            }
            obj.skills = skills
        }
        if (githublink) {
            if (!isURL(githublink)) {
                return res.status(400).json({ message: "Invalid github link" })
            }
            obj.githubLink = githublink
        }
        if (livelink) {
            if (!isURL(livelink)) {
                return res.status(400).json({ message: "Invalid live link" })
            }
            obj.liveLink = livelink
        }
        if (image) obj.image = image

        if (obj.title || obj.description || obj.skills || obj.githublink || obj.livelink || obj.image) {
            await db.update(project).set(obj).where(eq(project.id, pid))
        }
        return res.status(200).json({ message: "Project update success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Unable to update project" })
    }
}

export const deleteProject = async (req: Request<{ pid: number }, {}, PROJECT_DELETE_REQUEST>,
    res: Response<PROJECT_DELETE_RESPONSE>) => {
    try {
        const { pid } = req.params
        if (!pid) {
            return res.status(400).json({ message: "Invalid project id" })
        }
        await db.delete(project).where(eq(project.id, pid))
        return res.status(200).json({ message: "Project delete success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Unable to delete project" })
    }
}


export const addSkill = async (req: Request<{}, {}, SKILL_CREATE_REQUEST>, res: Response<SKILL_CREATE_RESPONSE>) => {
    try {
        const { name, category, icon } = req.body
        if (!name || !category || !icon) {
            return res.status(400).json({ message: "All fields required" })
        }
        await db.insert(skills).values({ name, category, icon })
        return res.status(200).json({ message: "skill add success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to add skill" })
    }
}

export const readSkill = async (req: Request<{}, {}, READ_SKILLS_REQUEST>, res: Response<READ_SKILLS_RESPONSE>) => {
    try {
        const result = await db.select().from(skills)
        if (result.length === 0) {
            return res.status(404).json({ message: "No skills found" })
        }
        return res.status(200).json({ message: "skills read success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to read skills" })
    }
}

export const deleteSkill = async (req: Request<{ sid: number }, {}, SKILL_DELETE_REQUEST>, res: Response<SKILL_DELETE_RESPONSE>) => {
    try {
        const { sid } = req.params
        const result = await db.delete(skills).where(eq(skills.id, sid))
        if (!result) {
            return res.status(404).json({ message: "Skill not found" })
        }
        return res.status(200).json({ message: "skill delete success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to delete skill" })
    }
}


export const addExperience = async (req: Request<{}, {}, EXPERIENCE_CREATE_REQUEST>, res: Response<EXPERIENCE_CREATE_RESPONSE>) => {
    try {
        const { company, role, duration, description } = req.body
        if (!company || !role || !duration || !description) {
            return res.status(400).json({ message: "All fields required" })
        }
        await db.insert(experience).values({ company, role, duration, description })
        return res.status(200).json({ message: "experience add success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to add experience" })
    }
}

export const readExperience = async (req: Request<{}, {}, EXPERIENCE_READ_REQUEST>, res: Response<EXPERIENCE_READ_RESPONSE>) => {
    try {
        const result = await db.select().from(experience)
        return res.status(200).json({
            message: "experience fetch success", result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to fetch experience" })
    }
}

export const deleteExperience = async (req: Request<{ eid: number }, {}, EXPERIENCE_DELETE_REQUEST>, res: Response<EXPERIENCE_DELETE_RESPONSE>) => {
    try {
        const { eid } = req.params
        await db.delete(experience).where(eq(experience.id, eid))
        return res.status(200).json({ message: "experience delete success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to delete experience" })
    }
}

export const updateExperience = async (
    req: Request<{ eid: number }, {}, EXPERIENCE_UPDATE_REQUEST>,
    res: Response<EXPERIENCE_UPDATE_RESPONSE>
) => {
    try {
        const { eid } = req.params
        if (!eid) {
            return res.status(400).json({ message: "not found experience id" })
        }
        const { company, role, duration, description } = req.body
        const updateData: any = {}
        if (company) updateData.company = company
        if (role) updateData.role = role
        if (duration) updateData.duration = duration
        if (description) updateData.description = description
        if (updateData.company || updateData.role || updateData.duration || updateData.description) {
            await db.update(experience).set(updateData).where(eq(experience.id, eid))
        }
        return res.status(200).json({ message: "experience update success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to update experience" })
    }
}


export const addEducation = async (
    req: Request<{}, {}, EDUCATION_CREATE_REQUEST>,
    res: Response<EDUCATION_CREATE_RESPONSE>
) => {
    try {
        const { college, degree, year } = req.body
        if (!college || !degree || !year) {
            return res.status(400).json({ message: "All fields required" })
        }
        await db.insert(education).values({ college, degree, year })
        return res.status(200).json({ message: "education add success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to add education" })
    }
}

export const readEducation = async (
    req: Request<{}, {}, EDUCATION_READ_REQUEST>,
    res: Response<EDUCATION_READ_RESPONSE>
) => {
    try {
        const result = await db.select().from(education)
        return res.status(200).json({ message: "education fetch success", result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to fetch education" })
    }
}

export const deleteEducation = async (
    req: Request<{ eid: number }, {}, EDUCATION_DELETE_REQUEST>,
    res: Response<EDUCATION_DELETE_RESPONSE>
) => {
    try {
        const { eid } = req.params
        await db.delete(education).where(eq(education.id, eid))
        return res.status(200).json({ message: "education delete success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to delete education" })
    }
}

export const updateEducation = async (
    req: Request<{ eid: number }, {}, EDUCATION_UPDATE_REQUEST>,
    res: Response<EDUCATION_UPDATE_RESPONSE>
) => {
    try {
        const { eid } = req.params
        if (!(eid)) {
            return res.status(400).json({ message: "not found education id" })
        }
        const { college, degree, year } = req.body
        const updateData: any = {}
        if (college) updateData.college = college
        if (degree) updateData.degree = degree
        if (year) updateData.year = year
        if (updateData.college || updateData.degree || updateData.year) {
            await db.update(education).set(updateData).where(eq(education.id, eid))
        }
        return res.status(200).json({ message: "education update success" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to update education" })
    }
}


export const addProfile = async (
    req: Request,
    res: Response<ADD_PROFILEPIC_RESPONSE>
) => {
    try {
        const mreq = req as MulterRequest
        resumeprofileUpload(mreq, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: "unable to upload profile pic" })
            }
            if (!mreq.file) {
                return res.status(400).json({ message: "profile pic is required" })
            }
            console.log(mreq.body)
            console.log(mreq.file)
            const { secure_url } = await cloud.uploader.upload(mreq.file.path)
            await db.update(profile).set({ profilePic: secure_url }).where(eq(profile.role, "user"))
            return res.status(201).json({ message: "profile pic add success" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to add profile pic" })
    }
}

export const updateProfile = async (
    req: Request<{ pid: number }, {}, PROFILE_UPDATE_REQUEST>,
    res: Response<PROFILE_UPDATE_RESPONSE>
) => {
    try {
        const { pid } = req.params
        if (!pid) {
            return res.status(400).json({ message: "Invalid project id" })
        }
        const mreq = req as UserUpdateMulterRequest
        resumeprofileUpload(mreq, res, async (err: any) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            const result = await db.select().from(profile).where(eq(profile.role, "user"))
            const user = result[0]
            if (!user) {
                return res.status(404).json({ message: "profile not found" })
            }
            if (mreq.file) {
                if (user.profilePic) {
                    const publicId = path.basename(user.profilePic).split(".")[0]
                    await cloud.uploader.destroy(publicId as string)
                }
                const { secure_url } = await cloud.uploader.upload(mreq.file.path)
                await db.update(profile).set({ profilePic: secure_url }).where(eq(profile.id, user.id))
                return res.status(200).json({ message: "profile pic update success" })
            }
            await db.update(profile).set(mreq.body).where(eq(profile.id, pid))
            return res.status(200).json({ message: "profile update success" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "unable to update profile" })
    }
}

export const readProfile = async (
    req: Request<{}, {}, PROFILE_READ_REQUEST>,
    res: Response<PROFILE_READ_RESPONSE>
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


export const getContacts = async (
    req: Request<{}, {}, GET_CONTACT_REQUSET>,
    res: Response<GET_CONTACT_RESPONSE>
) => {
    try {
        const result = await db.select().from(contact).orderBy(desc(contact.createdAt))
        return res.status(200).json({ message: "contact details fetch success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to get contact details" })
    }
}


export const addStats = async (
    req: Request<{}, {}, STATS_CREATE_REQUEST>,
    res: Response<STATS_CREATE_RESPONSE>
) => {
    try {
        const { experience, projects, technologies, clients } = req.body
        const existing = await db.select().from(stats).limit(1)
        const first = existing[0]

        if (!first) {
            await db.insert(stats).values({ experience, projects, technologies, clients })
        } else {
            await db.update(stats).set({ experience, projects, technologies, clients }).where(eq(stats.id, first.id))
        }
        return res.status(200).json({ message: "Stats added successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "unable to add stats" })
    }
}

export const readStats = async (
    req: Request<{}, {}, READ_STATS_REQUEST>,
    res: Response<READ_STATS_RESPONSE>
) => {
    try {
        const [result] = await db.select().from(stats).limit(1)
        if (!result) {
            return res.status(500).json({ message: "no data" })
        }
        return res.status(200).json({
            message: "Stats fetched successfully",
            result: {
                experience: result.experience,
                projects: result.projects,
                technologies: result.technologies,
                clients: result.clients,
            }
        })
    } catch (error: any) {
        console.error(error)
        return res.status(500).json({ message: error.message || "unable to fetch stats" })
    }
}


export const addResume = async (
    req: Request<{}, {}, RESUME_UPLOAD_REQUEST>,
    res: Response<RESUME_UPLOAD_RESPONSE>
) => {
    try {
        const mreq = req as AddResumeMulterRequest
        resumeprofileUpload(mreq, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: "unable to upload resume" })
            }
            if (!mreq.file) {
                return res.status(400).json({ message: "resume file is required" })
            }
            console.log(mreq.file)

            const [existing] = await db.select().from(profile).where(eq(profile.role, "user")).limit(1)
            if (!existing) {
                return res.status(404).json({ message: "profile not found" })
            }
            if (existing.resume) {
                const publicId = path.basename(existing.resume).split(".")[0]
                await cloud.uploader.destroy(publicId as string)
            }
            const { secure_url } = await cloud.uploader.upload(mreq.file.path)
            await db.update(profile).set({ resume: secure_url }).where(eq(profile.role, "user"))
            return res.status(201).json({ message: "resume upload success" })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "unable to add resume" })
    }
}