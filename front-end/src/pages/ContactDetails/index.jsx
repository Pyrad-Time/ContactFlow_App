import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getContactById, deleteContact } from "../../services/contactService"
import { createInteraction, deleteInteraction, getInteractionsByContactId } from "../../services/interactionService"

export function ContactDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

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

        await createInteraction(id, newInteraction.trim())

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

    async function handleDeleteContact() {
        const wantsToDelete = window.confirm("Are you sure you want to delete this contact?")

        if(!wantsToDelete) {
            return
        }

        try {
            await deleteContact(id)

            navigate("/contacts")
        } catch(error) {
            console.error(error)
            setErrorMessage("Could not delete contact.")
        }
         
    }

    const contactInitial = contact.name?.charAt(0).toUpperCase() || "?"

    const createdAt = contact.created_at
        ? new Date(contact.created_at).toLocaleString("pt-BR")
        : "Not specified"

    const updatedAt = contact.updatedAt
        ? new Data(contact.updatedAt).toLocaleString("pt-BR")
        : "Not specified"
    return ( 
        <main className="page">
            <section className="pageHeader">
                <h1>Contact Details</h1>
                <p>View contact information and interaction history.</p>
            </section>
            
            <section className="card contactDetailsCard">
                <div className="contactAvatar contactDetailsAvatar">
                    {contactInitial}
                </div>

                <div className="contactDetailsInfo">
                    <div className="contactDetailHeader">
                        <div>
                            <h2>{contact.name}</h2>
                            <p>{contact.role || "No role informed"} </p>
                        </div>

                        <div className="contactDetailsActions">
                            <Link
                                className="button buttonSecondary buttonSmall"
                                to={`/contacts/${contact.id}/edit`}
                            >
                                Edit
                            </Link>

                            <button
                                className="button buttonDanger buttonSmall"
                                type="button"
                                onClick={handleDeleteContact}
                            >
                                Delete contact
                            </button>
                        </div>
                    </div>
                    <div className="contactDetailsMeta">
                        <span className="badge">
                            Status: {contact.status}        
                        </span>
                        
                        <span className="badge badgeSecondary">
                            Source: {contact.source}
                        </span>
                    </div>

                    <div className="contactDetailsGrid">
                        <div className="contactDetailsItem">
                            <span className="contactDetailsLabel">
                                Email
                            </span>
                            <strong>
                                {contact.email || "Not specified."} 
                            </strong>
                        </div>
                        <div className="contactDetailsItem">
                            <span className="contactDetailsLabel">
                                Phone
                            </span>
                            <strong>
                                {contact.phone || "Not specified."} 
                            </strong>
                        </div>
                        <div className="contactDetailsItem">
                            <span className="contactDetailsLabel">
                                Company
                            </span> 
                            <strong>
                                {contact.company || "Not specified."} 
                            </strong>
                        </div>
                        <div className="contactDetailsItem">
                            <span className="contactDetailsLabel">
                                Role
                            </span>
                            <strong>
                                {contact.role || "Not specified."} 
                            </strong>
                        </div>
                        <div className="contactDetailsItem">
                            <span className="contactDetailsLabel">
                                Created at
                            </span>
                            <strong>
                                {createdAt}
                            </strong>
                        </div>
                        <div className="contactDetailsItem">
                            <span className="contactDetailsLabel">
                                Updated at
                            </span>
                            <strong>
                                {updatedAt}
                            </strong>
                        </div>
                    </div>
                    <div className="contactDetailsNotes">
                        <span className="contactDetailsLabel">
                            Notes
                        </span>
                        <p>{contact.notes || "Not specified"}</p>
                    </div>
                </div>
            </section>
            <section className="card interactionsSection">
                <h2>Interactions</h2>
                {interactions.length === 0 ? (
                    <p className="emptyState">No interactions found.</p>
                ) : (
                    <ul className="interactionsList">
                        {interactions.map((interaction) => {
                            return (
                                <li className="interactionItem" key={interaction.id}>
                                    <div>
                                        <p className="interactionContent">
                                            {interaction.content}
                                        </p>
                                        <small className="interactionDate">
                                            {interaction.created_at}
                                        </small>
                                    </div>

                                    <button 
                                        className="button buttonDanger buttonSmall"
                                        type="button"
                                        onClick={() => handleDeleteInteraction(interaction.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </section>
            <section className="card">
                <form className="form interactionForm" onSubmit={handleSubmit}>
                    <h2>New Interaction</h2>

                    <div className="formGroup">
                        {interactionError && (
                            <p className="errorMessage">{interactionError}</p>
                        )}
                        <textarea
                            className="formControl"
                            name="newInteraction"
                            id="newInteraction"
                            value={newInteraction}
                            onChange={handleChange}
                        />

                        <button className="button buttonPrimary" type="submit">
                            Add Interaction
                        </button>    
                    </div>
                </form>
            </section>
        </main>
    )
}