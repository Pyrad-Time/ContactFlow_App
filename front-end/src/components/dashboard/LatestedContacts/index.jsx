export function LatestContacts({title, value}) {
    return (
        <section>
            <h2>{title}</h2>

            {value.length === 0 ? (
                <p>Nenhum dado encontrado</p>
            ) : (value.map((data) => {
                return (
                    <article key={data.id}>
                        <h3><strong>{data.name}</strong></h3>
                        <p>Empresa: {data.company}</p>
                        <p>Status: {data.status}</p>
                        <p>Origem: {data.source}</p>
                        <p>Criado: {data.created_at}</p>
                    </article>
                )
            }))}
        </section>
    )
}