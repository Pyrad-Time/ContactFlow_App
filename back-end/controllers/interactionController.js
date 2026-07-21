import { createInteraction, deleteInteraction } from "../repositories/interactionRepositories.js";

export async function createInteractionController(req, res) {
    try {
        const { id } = req.params
        const { content } = req.body

    if(!content) {
        return res.status(400).json({ message: "Content not exist" })
    }

    const createdInteraction = await createInteraction(id, content)

    return res.status(201).json(createdInteraction)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteInteractionController(req, res) {
    try {
        const { id, interactionId } = req.params

        const deletedInteraction = await deleteInteraction(id, interactionId)

        if(!deleteInteraction) {
            res.status(400).json({ message: "Interaction not found"})
        }

        return res.status(200).json(deletedInteraction)
    } catch(error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}