import express from "express"
import { createContactController, findAllContactsController, findContactByIdController } from "../controllers/contactController.js"

const router = express.Router()

router.get("/", findAllContactsController)
router.get("/:id", findContactByIdController)
router.post("/", createContactController)

export default router