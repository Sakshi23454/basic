import { Router } from "express"
import { addEducation, addExperience, addProfile, addProject, addResume, addSkill, addStats, deleteEducation, deleteExperience, deleteProject, deleteSkill, getContacts, readEducation, readExperience, readProfile, readProjects, readSkill, readStats, updateEducation, updateExperience, updateProfile, updateProject } from "../controllers/admin.controller"
const router = Router()

router
    .post("/addproject", addProject)
    .get("/readprojects", readProjects)
    .put("/update-project/:pid", updateProject)
    .delete("/delete-project/:pid", deleteProject)
    .post("/addskill", addSkill)
    .get("/readskill", readSkill)
    .delete("/delete-skill/:sid", deleteSkill)
    .post("/addexperience", addExperience)
    .get("/readexperience", readExperience)
    .put("/update-experience/:eid", updateExperience)
    .delete("/delete-experience/:eid", deleteExperience)
    .post("/addeducation", addEducation)
    .get("/readeducation", readEducation)
    .put("/update-education/:eid", updateEducation)
    .delete("/delete-education/:eid", deleteEducation)
    .post("/addprofile", addProfile)
    .put("/update-profile/:pid", updateProfile)
    .get("/readprofile", readProfile)
    .get("/getcontacts", getContacts)
    .post("/addstats", addStats)
    .get("/readstats", readStats)
    .post("/addresume", addResume)

export default router