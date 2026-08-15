import { useState } from "react";

export function ContactForm({ onSubmit }) {
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        source: "other",
        status: "new",
        notes: ""
    })

    function handleChange(event) {
        const { name, value } = event.target

        setFormData((currentData) =>({
            ...currentData,
            [name]:value
        }))

    }

    function handleSubmit(event) {
        event.preventDefault()

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Contact Form</h2>

            <div>
                <label htmlFor="name">Name</label>

                <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>

                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="phone">Phone</label>

                <input 
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="company">Company</label>
                
                <input 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="role">Role</label>

                <input 
                    type="text" 
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="source">Source</label>

                <select
                    id="source"
                    name="source" 
                    value={formData.source}
                    onChange={handleChange}
                > 

                <option value="linkedin">LinkedIn</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="referral">Referral</option>
                <option value="event">Event</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="status">Status</label>

                <select 
                    name="status" 
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="new">New</option>
                    <option value="in_contact">In contact</option>
                    <option value="client">Client</option>
                    <option value="partner">Partner</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            <div>
                <label htmlFor="notes">Notes</label>

                <textarea 
                    name="notes" 
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
                
            </div>

            <button type="submit">Save contact</button>
        </form>
    )
}