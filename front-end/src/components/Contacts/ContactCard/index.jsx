
export function ContactCard({contact}) {
    return (
        <>
            <article>
            <h2>Nome: {contact.name}</h2>
            <p>Email: {contact.email || "Não informado"}</p>
            <p>Empresa: {contact.company || "Não informado"}</p>
            <p>Status: {contact.status}</p>
            <p>Origem: {contact.source}</p>
        </article>

        
        </>
    )
}