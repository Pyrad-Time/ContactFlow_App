import { Link } from "react-router-dom"

export function ContactCard({contact}) {
    return (
        <>
            <article>
            <h2>Nome: {contact.name}</h2>
            <p>Email: {contact.email || "Não informado"}</p>
            <p>Empresa: {contact.company || "Não informado"}</p>
            <p>Status: {contact.status}</p>
            <p>Origem: {contact.source}</p>
            
            <div>
                <Link to={`/contacts/${contact.id}`}>
                    Ver detalhes
                </Link>

                <Link to={`/contacts/${contact.id}/edit`}>
                    Editar
                </Link>

                <button type="button">
                    Excluir
                </button>
            </div>
        </article>

        </>
    )
}