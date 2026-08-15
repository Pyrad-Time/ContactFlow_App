import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getContactById } from "../../services/contactService"

export function ContactDetails() {
    const { id } = useParams()

    const [ contact, setContact ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState("")

    useEffect(() => {
        async function loadContact() {
            try {
                setIsLoading(true)
                setErrorMessage("")

                const contactById = await getContactById(id)
                setContact(contactById)

            } catch (err){
                console.error(err)
                setErrorMessage("Could not load contact details.")
            } finally {
                setIsLoading(false)
            }
        }

        loadContact()
    }, [id])

    if(isLoading) {
        return <p>Loading...</p>
    }

    if(errorMessage) {
        return <p>Error: {errorMessage}</p>
    }

    if(!contact) {
        return <p>Contact not found.</p>
    }
    return ( 
        <main>
            <h1>Contact Details</h1>
            <p>Contact details and interactions {id} </p>
            
            <h2>Name: {contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
        </main>
    )
}