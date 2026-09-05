export function formatStatus(status) {
    const statusLabel = {
        new: "New",
        in_contact: "In contact",
        client: "Client",
        partner: "Partner",
        archived: "Archived"
    }

    return statusLabel[status] || "Not specified."
}

export function formatSource(source) {
    const sourceLabel = {
        linkedin: "LinkedIn",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        referral: "Referral",
        event: "Event",
        website: "Website",
        other: "Other"
    }

    return sourceLabel[source] || "Not specified."
}