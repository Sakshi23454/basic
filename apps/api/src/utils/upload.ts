import multer, { diskStorage } from "multer";

export const resumeprofileUpload = multer({
  storage: diskStorage({}),
}).single("resume")