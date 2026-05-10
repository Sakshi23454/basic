import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes"
import adminRoutes from "./routes/admin.routes"
import userRoutes from "./routes/user.routes"
import { FRONTEND_URL, NODE_ENV, PRODUCTION } from "./config/env"
const app = express()
app.use(cookieParser())
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}
))
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)
app.get("/", (req, res) => {
    res.json({ message: "API running successfully" })
})
const PORT = 5000
// app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

if(NODE_ENV !== PRODUCTION){
    app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
}
