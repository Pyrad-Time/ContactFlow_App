import express from "express"
import { createContactController, deleteContactController, findAllContactsController, findContactByIdController, updateContactController } from "../controllers/contactController.js"
import { createInteractionController, deleteInteractionController, findInteractionByContactIdController } from "../controllers/interactionController.js"


const router = express.Router()

router.get("/", findAllContactsController)
router.get("/:id", findContactByIdController)
router.get("/:id/interactions", findInteractionByContactIdController)
router.post("/", createContactController)
router.post("/:id/interactions", createInteractionController)
router.delete("/:id", deleteContactController)
router.delete("/:id/interactions/:interactionId", deleteInteractionController)
router.patch("/:id", updateContactController)

export default router