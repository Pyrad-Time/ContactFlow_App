import { query } from "../database/connection.js";

export async function getTotalContacts(){
    const result = await query(`
        SELECT COUNT(*) AS total
        FROM contacts
        `)
    
    const totalContacts = Number(result.rows[0].total)

    return totalContacts
}

export async function getContactsByStatus() {
    const result = await query(`
        SELECT status, COUNT(*) AS total
        FROM contacts
        GROUP BY status
        ORDER BY status
        `)
    const totalStatus = result.rows.map((row) => {
        return {
            status: row.status,
            total: Number(row.total)
        }
    })

    return totalStatus
}