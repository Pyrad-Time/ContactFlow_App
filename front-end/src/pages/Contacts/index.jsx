import { useEffect, useState } from "react"
import { getContacts } from "../../services/contactService"
import { ContactCard } from "../../components/Contacts/ContactCard"
import { ContactFilters } from "../../components/Contacts/ContactFilters"
import { Link } from "react-router-dom"


export function Contacts() {
    const [contacts, setContacts] = useState([])
    const [ isLoading, setIsLoading] = useState(true)
    const [ err, setErr] = useState(null)
    const [ filters, setFilters ] = useState({
        search: "",
        status: "",
        source: ""
    })

    useEffect(() => {
        async function fetchContactsData() {
            try {
            setIsLoading(true)
            setErr(null)

            const data = await getContacts(filters)

            setContacts(data)
        } catch(error) {
            setErr(error.message)
        } finally {
            setIsLoading(false)
        }
        }

        fetchContactsData()
    }, [filters])

        function renderContactsContent() {
            if(isLoading) {
            return (
                    <p>Carregando contatos</p>
            )
            }

            if(err) {
                return (
                    <section>
                        <h1>Erro ao carregar dados.</h1>
                        <p>Erro: {err}</p>
                    </section>
                )
            }

            if(contacts.length === 0) {
                return <p>Nenhum contato encontrado</p>
            }

            return contacts.map((contact) => {
                return (
                    <ContactCard 
                        contact={contact} 
                        key={contact.id}
                    />
                )
            })
        }

        

    return (
        <main>
            <h1>ContactFlow contacts page</h1>
            
                <Link to={`/contacts/new`}>
                    Novo contato
                </Link>

                <ContactFilters 
                    filters={filters}
                    setFilters={setFilters}
                />

            {renderContactsContent()}
        </main>
    )
}