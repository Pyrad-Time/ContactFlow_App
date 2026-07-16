import express from "express";
import { query } from "./database/connection.js"
import contactRoutes from "./routes/contactRoutes.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

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


app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT} `)
})