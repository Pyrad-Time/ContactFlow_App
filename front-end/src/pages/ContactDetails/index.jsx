import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getContactById } from "../../services/contactService"
import { createInteraction, deleteInteraction, getInteractionsByContactId } from "../../services/interactionService"

export function ContactDetails() {
    const { id } = useParams()

    const [ contact, setContact ] = useState(null)
    const [ interactions, setInteractions ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ newInteraction, setNewInteraction ] = useState("")
    const [ interactionError, setInteractionError ] = useState("")

    function handleChange(event) {
        setNewInteraction(event.target.value)
    }
    
    

    async function handleSubmit(e) {
        e.preventDefault()

        if(newInteraction.trim().length === 0) {
            setInteractionError("Interaction content is required")
            return
        }

        setInteractionError("")

        await createInteraction(id, {
                content: newInteraction
        })

        const interactionsData = await getInteractionsByContactId(id)
        setInteractions(interactionsData.interactions || [])
        setNewInteraction("")
    }

    async function handleDeleteInteraction(interactionId) {
        await deleteInteraction(id, interactionId)
        
        setInteractions((currentInteraction) => {
           return currentInteraction.filter((interaction) => interaction.id !== interactionId)
        })
    }

    useEffect(() => {
        async function loadContact() {
            try {
                setIsLoading(true)
                setErrorMessage("")

                const contactById = await getContactById(id)
                const interactionsData = await getInteractionsByContactId(id)

                setContact(contactById)
                setInteractions(interactionsData.interactions || [])
                
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
            <p>Notes: {contact.notes}</p>

            <h2>Interactions</h2>
            {interactions.length === 0 ? (
                <p>No interactions found.</p>
            ) : (
                <ul>
                    {interactions.map((interaction) => {
                        return (
                             <li key={interaction.id}>
                                <p>{interaction.content}</p>
                                <small>{interaction.created_at}</small>

                                <button
                                    onClick={() => handleDeleteInteraction(interaction.id)}
                                    >
                                    Delete</button>
                            </li>
                        )
                    })}
                </ul>
            )}

            
            <form onSubmit={handleSubmit}>
                <h2>New Interaction</h2>

                <div>
                    {interactionError && <p>{interactionError}</p>}
                    <textarea  
                        name="newInteraction" 
                        id="newInteraction"
                        value={newInteraction}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Interaction</button>
            </form>
        </main>
    )
}