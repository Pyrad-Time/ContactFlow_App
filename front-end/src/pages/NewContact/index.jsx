import { ContactForm } from "../../components/Contacts/ContactForm";
import { createContact } from "../../services/contactService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function NewContact() {
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    async function handleCreateContact(contactData) {
        try {
            setErrorMessage("")
            setIsSubmitting(true)
            await createContact(contactData)
    
            navigate("/contacts")
        } catch (err) {
            console.error(err)
            setErrorMessage("Could not create contact. Please try again.")
        } finally {
            setIsSubmitting(false)
        }

    }
    return (
        <main className="page">
            <section className="pageHeader">
                <h1>New Contact</h1>
                <p>Create a new contact</p>
            </section>

            <section className="card">
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}

                <ContactForm 
                    onSubmit={handleCreateContact} 
                    isSubmitting={isSubmitting}
                />
           </section>
        </main>

    )
}