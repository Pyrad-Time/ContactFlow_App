import { query } from "../database/connection.js"

export async function findAllContacts() {
    const result = await query(`
        SELECT
            id,
            name,
            email,
            phone,
            company, 
            role,
            source,
            status,
            notes,
            created_at,
            updated_at
        FROM contacts
        ORDER BY created_at DESC
        `)
    return result.rows
}

export async function createContact(contactData) {
    const {
        name, 
        email,
        phone,
        company,
        role,
        source,
        status,
        notes
    } = contactData

    const result = await query(
        `
        INSERT INTO contacts(
            name, 
            email, 
            phone,
            company,
            role,
            source,
            status,
            notes
        )
        VALUES ($1, $2,$3,$4,$5,$6,$7,$8)
        RETURNING *
        `, [
            name, 
            email,
            phone,
            company,
            role,
            source,
            status,
            notes
        ]
    )

    return result.rows[0]
}