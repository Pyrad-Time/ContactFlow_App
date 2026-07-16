import express from "express"
import { createContactController } from "../controllers/contactController.js"

const router = express.Router()

router.post("/", createContactController)

export default router