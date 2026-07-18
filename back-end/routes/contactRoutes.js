import express from "express"
import { createContactController, deleteContactController, findAllContactsController, findContactByIdController, updateContactController } from "../controllers/contactController.js"

const router = express.Router()

router.get("/", findAllContactsController)
router.get("/:id", findContactByIdController)
router.post("/", createContactController)
router.delete("/:id", deleteContactController)
router.patch("/:id", updateContactController)

export default router