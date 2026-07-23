import { getContactsBySource, getContactsByStatus, getTotalContacts } from "../repositories/dashboardRepositories.js";

export async function getDashboardController (req, res) {
    try{
        const totalContacts = await getTotalContacts()
        const contactByStatus = await getContactsByStatus()
        const contactBySource = await getContactsBySource()


        return res.status(200).json({totalContacts, contactByStatus, contactBySource})

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}