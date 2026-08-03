import { useEffect, useState } from "react"
import { getContacts } from "../../services/contactService"
import { ContactCard } from "../../components/Contacts/ContactCard"


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
                <article>
                    <h1>Carregando contatos</h1>
                </article>
            )
        }

        if(err) {
            return (
                <article>
                    <h1>Erro ao carregar dados.</h1>
                    <p>Erro: {err}</p>
                </article>
            )
        }


    return (
        <main>
            <h1>ContactFlow contacts page</h1>
            <pre>{JSON.stringify(contacts, null, 2)}</pre>

            {contacts.map((contact) => {
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