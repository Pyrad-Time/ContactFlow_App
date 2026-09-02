export function ContactFilters({ filters, setFilters}) {
    function handleFilterChange(field, value) {
        setFilters({
            ...filters,
            [field]: value
        })
    }

    return (
        <form className="contactFilters">
            <div className="formGroup">
                <label htmlFor="search">Search contact</label>
                <input 
                    className="formControl"
                    type="text" 
                    id="search"
                    name="search"
                    placeholder="Search by name..."
                    value={filters.search}
                    onChange={(event) => {
                        handleFilterChange("search", event.target.value)
                    }}
                    />
            </div>

            <div className="formGroup">
                <label htmlFor="status">Status</label>

                <select 
                    className="formControl"
                    id="status"
                    value={filters.status}
                    onChange={(event) => {
                        handleFilterChange("status", event.target.value)
                    }}
                >
                    <option value="">All</option>
                    <option value="new">New</option>
                    <option value="in_contact">In contact</option>
                    <option value="client">Client</option>
                    <option value="partner">Partner</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            <div className="formGroup">
                <label htmlFor="source">Origem</label>
                <select 
                    className="formControl"
                    id="source"
                    value={filters.source}
                    onChange={(event) => {
                        handleFilterChange("source", event.target.value)
                    }}
                >
                    <option value="">All</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                    <option value="referral">Indicação</option>
                    <option value="event">Evento</option>
                    <option value="website">Website</option>
                    <option value="other">Outro</option>
                </select>
            </div>
        </form>
    )
}