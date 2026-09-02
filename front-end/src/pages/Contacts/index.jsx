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
                    <p className="stateMessage">Loading contacts...</p>
            )
            }

            if(err) {
                return (
                    <section className="errorState">
                        <h1>Loading error data...</h1>
                        <p>Error: {err}</p>
                    </section>
                )
            }

            if(contacts.length === 0) {
                return <p className="emptyState">Contact not found.</p>
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
        <main className="page">
            <section className="pageHeader">
                <h1>Contacts</h1>
                <p>Manage your contacts and opportunities.</p>
            </section>
            
            <section className="card">
                <div className="contactsToolbar">
                    <ContactFilters 
                        filters={filters}
                        setFilters={setFilters}
                    />
                    <Link className="button buttonPrimary" to={`/contacts/new`}>
                        New Contact
                    </Link>
                </div>
            </section>

            <section className="contactsList">
                {renderContactsContent()}
            </section>
        </main>
    )
}