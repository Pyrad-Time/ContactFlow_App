import { ContactForm } from "../../components/Contacts/ContactForm";

export function NewContact() {
    function handleCreateContact(contactData) {
        console.log(contactData)
    }
    return (
        <main>
            <h1>New Contact</h1>
            <p>Create a new contact</p>

            <ContactForm onSubmit={handleCreateContact}/>
        </main>
    )
}