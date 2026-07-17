import { createContact, findAllContacts, findContactById} from "../repositories/contactRepositories.js";

export async function findAllContactsController(req, res) {
    try {
        const allContacts = await findAllContacts()

        return res.status(200).json(allContacts)
    } catch(error) {
        return res.status(500).json({ message: "Internal serrver error" })
    }
}

export async function findContactByIdController(req, res) {
    try {
        const { id } = req.params

        const contact = await findContactById(id)

        if(!contact) {
            return res.status(404).json({ message: "Contact not found" })
        }

        return res.status(200).json(contact)
    } catch(error){
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function createContactController(req, res){
    try {
        const { 
            name, 
            email, 
            phone,
            company, 
            role, 
            source = "other", 
            status = "new", 
            notes 
        } = req.body
        

        if(!name || name.trim() === "") {
            return res.status(400).json({ message: "Contact name os required" })
        }

        const contact = await createContact({
            name, 
            email, 
            phone,
            company,
            role,
            source, 
            status, 
            notes
        })
            return res.status(201).json(contact)
    } catch(error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}