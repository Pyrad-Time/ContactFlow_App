import { query } from "../database/connection.js";

export async function getTotalContacts(){
    const result = await query(`
        SELECT COUNT(*) AS total
        FROM contacts
        `)
    
    const totalContacts = Number(result.rows[0].total)

    return totalContacts
}