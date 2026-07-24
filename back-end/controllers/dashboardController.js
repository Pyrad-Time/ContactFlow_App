import { getContactsBySource, getContactsByStatus, getLatestContacts, getTotalContacts, getTotalContactsByInteractions } from "../repositories/dashboardRepositories.js";

export async function getDashboardController (req, res) {
    try{
        const totalContacts = await getTotalContacts()
        const totalInteractions = await getTotalContactsByInteractions()
        const contactByStatus = await getContactsByStatus()
        const contactBySource = await getContactsBySource()
        const latestedContacts = await getLatestContacts()


        return res.status(200).json({totalContacts, contactByStatus, contactBySource, totalInteractions, latestedContacts})

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}