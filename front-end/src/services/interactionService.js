const URL_API = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export async function getInteractionsByContactId(contactId) {
    const response = await fetch(`${URL_API}/contacts/${contactId}/interactions`)

    if(!response.ok){
        throw new Error("Interactions not found")
    }

    return response.json()
}

export async function createInteraction(contactId, content) {
    const response = await fetch(`${URL_API}/contacts/${contactId}/interactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
    })

    if(!response.ok) {
        throw new Error("Interaction not created")
    }

    return response.json()
}

export async function deleteInteraction(contactId, interactionId) {
    const response = await fetch(`${URL_API}/contacts/${contactId}/interactions/${interactionId}`, {
        method: "DELETE"
    })

    if(!response.ok) {
        throw new Error("Interaction not deleted")
    }

    return response.json()
}