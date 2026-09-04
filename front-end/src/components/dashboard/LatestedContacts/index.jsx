import { Link } from "react-router-dom"

function formatDate(dateValue) {
    if(!dateValue) {
        return "Not specified"
    }

    return new Date(dateValue).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    })
}

export function LatestContacts({title, value}) {
    return (
        <section className="dashboardCard">
            <h2>{title}</h2>

            {value.length === 0 ? (
                <p>Nenhum dado encontrado</p>
            ) : (
                <div className="latestList">
                    {value.slice(0, 5).map((contact) => {
                    const contactInitial = contact.name?.charAt(0).toUpperCase() || "?"

                    return (

                        <Link
                            className="latestContactItem"
                            to={`/contacts/${contact.id}`}
                            key={contact.id}
                        >
                            <div className="latestAvatar">
                                {contactInitial}
                            </div>

                            <div className="latestContactInfo">
                                <h3>{contact.name}</h3>

                                <p>Company: {contact.company || "No company informed."}</p>

                                <div className="latestContactMeta">
                                    <p className="badge">
                                        Status: {contact.status}
                                    </p>
                                    <p className="badge badgeSecondary">
                                        Source: {contact.source}
                                    </p>
                                </div>

                                <small>
                                    Created at: {formatDate(contact.created_at)}
                                </small>
                            </div>
                        </Link>
                    )
                })}
            </div>
            )}
        </section>
    )
}