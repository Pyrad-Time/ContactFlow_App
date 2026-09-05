import { Link } from "react-router-dom"
import { formatSource, formatStatus } from "../../../utils/formatters" 

export function ContactCard({contact}) {
    const contactInitial = contact.name?.charAt(0).toUpperCase() || "?"
    return (

        <article className="contactCard">
            <div className="contactAvatar">
                <p>{contactInitial}</p>
            </div>

            <div className="contactCardInfo">
                <h2 className="contactCardTitle">
                    {contact.name}
                </h2>

                <p className="contactCardText">
                    E-mail: {contact.email || "Not specified."}
                </p>

                <p className="contactCardText">
                    Company: {contact.company || "Not specified."}
                </p>

                <div className="contactCardMeta">
                    <span className="badge">
                        Status: {formatStatus(contact.status)}
                    </span>

                    <span className="badge badgeSecondary">
                        Source: {formatSource(contact.source)}
                    </span>
                </div>

                <div className="contactCardActions">
                    <Link
                        className="button buttonSecondary" 
                        to={`/contacts/${contact.id}`}
                        >
                        Details
                    </Link>

                    <Link 
                        className="button buttonPrimary"
                        to={`/contacts/${contact.id}/edit`}
                        >
                        Edit
                    </Link>
                </div>
            </div>
        </article>
    )
}