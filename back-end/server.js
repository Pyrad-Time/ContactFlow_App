import express from "express";
import { query } from "./database/connection.js"
import contactRoutes from "./routes/contactRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import openApiDocument from "./docs/openapi.js"

const app = express()

const PORT = process.env.PORT || 3000

const allowedOrigins = [
    "http://localhost:5173",
    "https://contact-flow-app.vercel.app"
]

app.use(cors({
    origin: allowedOrigins
}))

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument))

app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok",
        message: "ContactFlow API is running"
    })
})

app.get("/db-health", async (req, res) => {
    try {
        const result = await query("SELECT NOW()")

        return res.status(200).json({
            status: "ok",
            message: "Database connection is working",
            databaseTime: result.rows[0].now,
        })
    } catch(error) {
        return res.status(500).json({
            status: `${error}`,
            message: "database connection failed"
        })
    }
})

app.use("/api/contacts", contactRoutes)
app.use("/api/dashboard", dashboardRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT} `)
})