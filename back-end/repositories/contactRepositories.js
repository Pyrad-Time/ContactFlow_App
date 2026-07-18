import { query } from "../database/connection.js"

export async function findAllContacts(filters = {}) {
    const { search, status, source } = filters
    
    const conditions = []
    const values = []

    let sql = `
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
    `

    if(status) {
        values.push(status)
        conditions.push(`status = $${values.length}`)
    }

    if(source) {
        values.push(source)
        conditions.push(`source = $${values.length}`)
    }

    if(search) {
        values.push(`%${search}%`)
        conditions.push(`(
                name ILIKE $${values.length}
                OR email ILIKE $${values.length}
                OR company ILIKE $${values.length}
            )`)        
    }

    if(conditions.length > 0) {
        sql += `\nWHERE ${conditions.join(" AND ")}`
    }

    const result = await query(`
        ${sql}
        ORDER BY created_at DESC
        `, values)

    return result.rows
}

export async function findContactById(id){
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
        WHERE id = $1
        `, [id])
    return result.rows[0]
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

export async function updateContact(id, contactData) {
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

    const result = await query(`
        UPDATE contacts
        SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            phone = COALESCE($3, phone),
            company = COALESCE($4, company),
            role = COALESCE($5, role),
            source = COALESCE($6, source),
            status = COALESCE($7, status),
            notes = COALESCE($8, notes)
        WHERE id = $9
        RETURNING *
        `, [
            name,
            email,
            phone,
            company,
            role,
            source,
            status,
            notes,
            id
        ])

        return result.rows[0]
}

export async function deleteContact(id) {
    const result = await query(`
        DELETE FROM contacts
        WHERE id = $1
        RETURNING *
        `, [id])

    return result.rows[0]
}