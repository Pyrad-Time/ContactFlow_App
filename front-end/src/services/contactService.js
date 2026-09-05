const URL_API = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export async function getContacts(filters = {}) {
    const searchParams = new URLSearchParams()

    if(filters.search) {
        searchParams.append("search", filters.search)
    }

    if(filters.status) {
        searchParams.append("status", filters.status)
    }

    if(filters.source) {
        searchParams.append("source", filters.source)
    }

    const queryString = searchParams.toString()

    const response = await fetch(`
        ${URL_API}/contacts${queryString ? `?${queryString}` : ""}
        `)
    
    if(!response.ok) {
        throw new Error("Contacts not found")
    }

    return response.json()
}

export async function getContactById(id) {
    const response = await fetch(`${URL_API}/contacts/${id}`)

    if(!response.ok){
        throw new Error("Contact not found")
    }

    return response.json()
}

export async function createContact(contactData) {
    const response = await fetch(`${URL_API}/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    })

    if(!response.ok) {
        throw new Error("Contact not created")
    }

    return response.json()
}

export async function updateContact(id, contactData) {
    const response = await fetch(`${URL_API}/contacts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    })

    if(!response.ok){
        throw new Error("Contact not updated")
    }

    return response.json()
}

export async function deleteContact(id) {
    const response = await fetch(`${URL_API}/contacts/${id}`, {
        method: "DELETE"
    })

    if(!response.ok){
        throw new Error("Contact not deleted")
    }

    return response.json()
}