export function ContactFilters({ filters, setFilters}) {
    function handleFilterChange(field, value) {
        setFilters({
            ...filters,
            [field]: value
        })
    }

    return (
        <section>
            <h2>Filtros</h2>

            <div>
                <label htmlFor="search">Buscar contato</label>
                <input 
                    type="text" 
                    id="search"
                    placeholder="Buscar por nome..."
                    value={filters.search}
                    onChange={(event) => {
                        handleFilterChange("search", event.target.value)
                    }}
                    />
            </div>

            <div>
                <label htmlFor="status">Status</label>

                <select 
                    id="status"
                    value={filters.status}
                    onChange={(event) => {
                        handleFilterChange("status", event.target.value)
                    }}
                >
                    <option value=""></option>
                    <option value="new">Novo</option>
                    <option value="in_contact">Em contato</option>
                    <option value="client">Cliente</option>
                    <option value="partner">Parceiro</option>
                    <option value="archived">Arquivado</option>
                </select>
            </div>

            <div>
                <label htmlFor="source">Origem</label>
                <select 
                    id="source"
                    value={filters.source}
                    onChange={(event) => {
                        handleFilterChange("source", event.target.value)
                    }}
                >
                    <option value="">Todas</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                    <option value="referral">Indicação</option>
                    <option value="event">Evento</option>
                    <option value="website">Website</option>
                    <option value="other">Outro</option>
                </select>
            </div>
        </section>
    )
}