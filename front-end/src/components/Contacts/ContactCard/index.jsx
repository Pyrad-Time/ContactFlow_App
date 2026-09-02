import { Link } from "react-router-dom"

export function ContactCard({contact}) {
    const contactInitial = contact.name?.charAt(0).toUpperCase() || "?"
    return (

        <article className="contactCard">
            <div className="contactAvatar">
                <p>{contactInitial}</p>
            </div>

            <div className="contactCardInfo">
                <h2 className="contactCardTitle">
                    Nome: {contact.name}
                </h2>

                <p className="contactCardText">
                    Email: {contact.email || "Não informado"}
                </p>

                <p className="contactCardText">
                    Empresa: {contact.company || "Não informado"}
                </p>

                <div className="contactCardMeta">
                    <span className="badge">
                        Status: {contact.status}
                    </span>

                    <span className="badge badgeSecondary">
                        Origem: {contact.source}
                    </span>
                </div>

                <div className="contactCardActions">
                    <Link
                        className="button buttonSecondary" 
                        to={`/contacts/${contact.id}`}
                        >
                        Ver detalhes
                    </Link>

                    <Link 
                        className="button buttonPrimary"
                        to={`/contacts/${contact.id}/edit`}
                        >
                        Editar
                    </Link>
                </div>
            </div>
        </article>
    )
}