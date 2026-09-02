import { useState } from "react";

export function ContactForm({ 
        onSubmit, 
        isSubmitting = false, 
        initialValues = {},
        submitLabel = "Save contact"
    }) {
    const [ formData, setFormData ] = useState({
        name: initialValues.name || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        company: initialValues.company || "",
        role: initialValues.role || "",
        source: initialValues.source || "other",
        status: initialValues.status || "new",
        notes: initialValues.notes || ""
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

        const cleanedData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        company: formData.company.trim() || null,
        role: formData.role.trim() || null,
        notes: formData.notes.trim() || null,
    }

        onSubmit(cleanedData)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Contact Form</h2>

            <div className="formGroup">
                <label htmlFor="name">Name</label>

                <input className="formControl" 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="formGroup">
                <label htmlFor="email">Email</label>

                <input className="formControl" 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="formGroup">
                <label htmlFor="phone">Phone</label>

                <input className="formControl"  
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="formGroup">
                <label htmlFor="company">Company</label>
                
                <input className="formControl" 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                />
            </div>

            <div className="formGroup">
                <label htmlFor="role">Role</label>

                <input className="formControl" 
                    type="text" 
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                />
            </div>

            <div className="formGroup">
                <label htmlFor="source">Source</label>

                <select
                    className="formControl"
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

            <div className="formGroup">
                <label htmlFor="status">Status</label>

                <select className="formControl" 
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

            <div className="formGroup">
                <label htmlFor="notes">Notes</label>

                <textarea className="formControl" 
                    name="notes" 
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
                
            </div>

            <button 
                className="button buttonPrimary"
                type="submit" 
                disabled={isSubmitting}
            >
                {isSubmitting ? "Saving..." : submitLabel}
            </button>
        </form>
    )
}