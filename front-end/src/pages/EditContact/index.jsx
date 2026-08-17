import { useEffect, useState } from "react"
import { ContactForm } from "../../components/Contacts/ContactForm/index.jsx"
import { useParams, useNavigate } from "react-router-dom"
import { getContactById, updateContact } from "../../services/contactService.js"

export function EditContact() {
    const { id } = useParams()

    const [ contact, setContact ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        async function loadContact() {
        try {
            setIsLoading(false)
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
        return <p>Loading contact...</p>
    }
    if(errorMessage) {
        return <p>Error: {errorMessage}</p>
    }

    if(!contact) {
        return <p>Contact not found</p>
    }

    async function handleUpdateContact(contactData) {
        await updateContact(id, contactData)

        navigate(`/contacts/${id}`)
    }

    return (
        <main>
            <h1>Edit Contact</h1>
            <p>Edit contact information</p>

            <h2>{contact.name}</h2>
            <ContactForm initialValues={contact} onSubmit={handleUpdateContact} submitLabel="Update contact"/>
        </main>
    )
}