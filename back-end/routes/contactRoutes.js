import express from "express"
import { createContactController, findAllContactsController } from "../controllers/contactController.js"

const router = express.Router()

router.get("/", findAllContactsController)
router.post("/", createContactController)

export default router