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
