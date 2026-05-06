import { Router } from "express"
import { addcontactForm, getEducation, getExperience, getProfile, getProjects, getSkills, viewStats } from "../controllers/user.controller"
const router = Router()

router
    .get("/getproject", getProjects)
    .get("/getskills", getSkills)
    .get("/getexperience", getExperience)
    .get("/geteducation", getEducation)
    .get("/getprofile", getProfile)
    .post("/addcontactform", addcontactForm)
    .get("/viewstats", viewStats)

export default router