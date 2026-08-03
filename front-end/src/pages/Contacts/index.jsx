import { useEffect, useState } from "react"
import { getContacts } from "../../services/contactService"
import { ContactCard } from "../../components/Contacts/ContactCard"
import { Link } from "react-router-dom"


export function Contacts() {
    const [contacts, setContacts] = useState([])
    const [ isLoading, setIsLoading] = useState(true)
    const [ err, setErr] = useState(null)

    useEffect(() => {
        async function fetchContactsData() {
            try {
            const data = await getContacts()

            setContacts(data)
        } catch(error) {
            setErr(error.message)
        } finally {
            setIsLoading(false)
        }
        }

        fetchContactsData()
    }, [])

        if(isLoading) {
            return (
                <main>
                    <h1>Carregando contatos</h1>
                </main>
            )
        }

        if(err) {
            return (
                <main>
                    <h1>Erro ao carregar dados.</h1>
                    <p>Erro: {err}</p>
                </main>
            )
        }

    return (
        <main>
            <h1>ContactFlow contacts page</h1>
            
                <Link to={`/contacts/new`}>
                    Novo contato
                </Link>


            {contacts.length === 0 ?
                <p>Nenhum contato encontrado</p> :
                contacts.map((contact) => {
                    return (
                        <ContactCard 
                            contact={contact} 
                            key={contact.id}
                        />
                    )
                })}
        </main>
    )
}