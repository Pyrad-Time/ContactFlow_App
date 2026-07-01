import express from "express";

const app = express()

const PORT = 3000

app.use(express.json())

app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok",
        message: "ContactFlow API is running"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT} `)
})