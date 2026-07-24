import { getContactsBySource, getContactsByStatus, getLatestContacts, getLatestInteractions, getTotalContacts, getTotalContactsByInteractions } from "../repositories/dashboardRepositories.js";

export async function getDashboardController (req, res) {
    try{
        const totalContacts = await getTotalContacts()
        const totalInteractions = await getTotalContactsByInteractions()
        const contactByStatus = await getContactsByStatus()
        const contactBySource = await getContactsBySource()
        const latestedContacts = await getLatestContacts()
        const latestedInteractions = await getLatestInteractions()


        return res.status(200).json({totalContacts, contactByStatus, contactBySource, totalInteractions, latestedContacts, latestedInteractions })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}