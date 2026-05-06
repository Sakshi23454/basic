import { eq } from "drizzle-orm"
import db from "./config/db"
import { profile } from "./models"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

const SEED_ADMIN_NAME = process.env.SEED_ADMIN_NAME as string
const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL as string
const SEED_ADMIN_MOBILE = process.env.SEED_ADMIN_MOBILE as string
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD as string
const SEED_ADMIN_ROLE = process.env.SEED_ADMIN_ROLE as string

export const seedAdmin = async () => {
    try {
        const [result] = await db.select().from(profile).where(eq(profile.role, "admin"))
        if (result) {
            console.log("admin already present")
        } else {
            const hash = await bcryptjs.hash(SEED_ADMIN_PASSWORD, 10)
            await db.insert(profile).values({
                name: SEED_ADMIN_NAME,
                email: SEED_ADMIN_EMAIL,
                password: hash,
                mobile: SEED_ADMIN_MOBILE,
                role: SEED_ADMIN_ROLE,
            })
            console.log("admin seed complete")
        }

        const [user] = await db.select().from(profile).where(eq(profile.role, "user"))
        if (user) {
            console.log("user already present")
        } else {
            await db.insert(profile).values({
                name: "Sakshi Markal",
                title: "Full Stack MERN Developer",
                email: "sakshimarkal66@gmail.com",
                mobile: "8983357193",
                profilePic: "xx",
                resume: "xx",
                bio: "Passionate web developer",
                github: "https://github.com/Sakshi23454",
                linkedin:
                    "https://www.linkedin.com/in/sakshi-markal-526a30295",
                role: "user",
                location: "Chh.Sambhajinagar, MH, India",
            })
            console.log("user seed complete")
        }
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

seedAdmin()