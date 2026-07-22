import { query } from "../database/connection.js";

export async function createInteraction(contactId, content) {
    const result = await query(`
        INSERT INTO contact_interactions(
            contact_id,
            content
        )
        VALUES ($1, $2)
        RETURNING *
        `, [contactId, content])

        return result.rows[0]
}


export async function getInteractionByContactId(contactId) {
    const result = await query(`
        SELECT 
            id,
            contact_id,
            content,
            created_at
        FROM contact_interactions
        WHERE contact_id = $1
        ORDER BY created_at DESC
        `, [contactId])

    return result.rows
}

export async function  deleteInteraction(contactId, interactionId){
    const result = await query (`
        DELETE FROM contact_interactions
        WHERE id = $1
        AND contact_id = $2
        RETURNING *
        `, [interactionId, contactId])

    return result.rows[0]
}