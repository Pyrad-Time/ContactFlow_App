import { useEffect, useState } from "react"
import { ContactForm } from "../../components/Contacts/ContactForm/index.jsx"
import { useParams, useNavigate } from "react-router-dom"
import { getContactById, updateContact } from "../../services/contactService.js"

export function EditContact() {
    const { id } = useParams()

    const [ contact, setContact ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        async function loadContact() {
        try {
            setIsLoading(true)
            setErrorMessage("")

            const contactData = await getContactById(id)

            setContact(contactData)
        } catch(error) {
            console.error(error)
            setErrorMessage("Could not load contact")
        } finally {
            setIsLoading(false)
        }
    }
    loadContact()
    }, [id])

    if(isLoading) {
        return (
            <main className="page">
                <p className="stateMessage">Loading contact...</p>
            </main>
        )
    }
    if(errorMessage) {
        return (
            <main className="page">
                <section className="errorState">
                    <h2>Error</h2>
                    <p>Error: {errorMessage}</p>
                </section>
            </main>
        )
    }

    if(!contact) {
        return (
            <main className="page">
                <p className="emptyState">Contact not found</p>
            </main>
        )
    }

    async function handleUpdateContact(contactData) {
        try {
            setIsSubmitting(true)
            setErrorMessage("")

            await updateContact(id, contactData)

            navigate(`/contacts/${id}`)
        } catch(error) {
            console.error(error)
            setErrorMessage("Could not update contact.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="page">
            <section className="pageHeader">
                <h1>Edit Contact</h1>
                <p>Edit contact information</p>
            </section>
            
            <section className="card">
                <div className="formHeader">
                    <h2>{contact.name}</h2>
                    <p>Update contact information</p>
                </div>
                <ContactForm 
                    initialValues={contact} 
                    onSubmit={handleUpdateContact} 
                    submitLabel="Update contact"
                    isSubmitting={isSubmitting}
                />
            </section>
        </main>
    )
}