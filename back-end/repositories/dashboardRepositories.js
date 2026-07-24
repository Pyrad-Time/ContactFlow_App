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

export async function getContactsBySource() {
    const result = await query(`
        SELECT source, COUNT(*) AS total
        FROM contacts
        GROUP BY source
        ORDER BY source
        `)
    const contactsBySource = result.rows.map((row) => {
        return {
            source: row.source,
            total: Number(row.total)
        }
    })

    return contactsBySource
}

export async function getTotalContactsByInteractions() {
    const result = await query(`
        SELECT COUNT(*) AS total
        FROM contact_interactions
        `)
    
    const totalInteractions = Number(result.rows[0].total)

    return totalInteractions
}

export async function getLatestContacts() {
    const result = await query(`
        SELECT 
            id, 
            name, 
            company,
            status,
            source,
            created_at
        FROM contacts
        ORDER BY created_at DESC
        LIMIT 5
        `)

    return result.rows
}

export async function getLatestInteractions() {
    const result = await query(`
        SELECT 
            contact_interactions.id,
            contact_interactions.contact_id,
            contacts.name AS contact_name,
            contact_interactions.content,
            contact_interactions.created_at
        FROM contact_interactions
        JOIN contacts
        ON contact_interactions.contact_id = contacts.id
        ORDER BY contact_interactions.created_at DESC
        LIMIT 5
        `)

    return result.rows
}