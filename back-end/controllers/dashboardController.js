import { getTotalContacts } from "../repositories/dashboardRepositories.js";

export async function getDashboardController (req, res) {
    try{
        const totalContacts = await getTotalContacts()

        return res.status(200).json({totalContacts})

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}