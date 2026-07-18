import express from "express"
import { createContactController, findAllContactsController, findContactByIdController, updateContactController } from "../controllers/contactController.js"

const router = express.Router()

router.get("/", findAllContactsController)
router.get("/:id", findContactByIdController)
router.post("/", createContactController)
router.patch("/:id", updateContactController)

export default router