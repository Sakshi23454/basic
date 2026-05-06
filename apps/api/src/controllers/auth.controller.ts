import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import db from "../config/db";
import { profile } from "../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { isEmail } from "validator";
import { LOGOUT_REQUEST, LOGOUT_RESPONSE, SIGNIN_REQUEST, SIGNIN_RESPONSE } from "@repo/types";
import { COOKIE_NAME, JWT_KEY, NODE_ENV, PRODUCTION } from "../config/env";

export const loginAdmin = async (req: Request<{}, {}, SIGNIN_REQUEST>, res: Response<SIGNIN_RESPONSE>) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" })
        }
        if (!isEmail(email)) {
            return res.status(400).json({ message: "invalid email" })
        }
        const [result] = await db.select().from(profile).where(eq(profile.email, email));
        if (!result) {
            return res.status(401).json({
                message:
                    NODE_ENV === PRODUCTION
                        ? "Invalid Credentials"
                        : "Email Not Found"
            })
        }
        if (result.role !== "admin") {
            return res.status(401).json({ message: "Access denied. Not an admin" })
        }
        const verify = await bcryptjs.compare(password, result.password as string)
        if (!verify) {
            return res.status(401).json({ message: NODE_ENV === PRODUCTION ? "Invalid Credentials" : "Invalid Password" })
        }
        const token = jwt.sign({ id: result.id }, JWT_KEY, { expiresIn: "1d" })
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: NODE_ENV === PRODUCTION,
            maxAge: 1000 * 60 * 60 * 24,
        })
        res.status(200).json({
            message: "admin login successful",
            result: {
                id: result.id,
                name: result.name as string,
                email: result.email,
                mobile: result.mobile as string,
                role: result.role,
            }
        })
    } catch (error) {
        res.status(500).json({ message: "admin login failed" })
    }
}


export const logoutAdmin = async (req: Request<{}, {}, LOGOUT_REQUEST>, res: Response<LOGOUT_RESPONSE
    >) => {
    try {
        res.clearCookie(COOKIE_NAME)
        res.status(200).json({ message: "admin Logout successful" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "admin logout failed" })
    }
}