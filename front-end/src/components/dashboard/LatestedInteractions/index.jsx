export function LatestInteractions({ title, value }) {
    return (
        <section>
            <h2>{title}</h2>

            {value.length === 0 ? (
                <p>Nenhum dado encontrado</p>
            ) : (value.map((data) => {
                return (
                    <article key={data.id}>
                        <p>Contato: {data.contact_name}</p>
                        <p>Interação: {data.content}</p>
                        <p>Data: {data.created_at}</p>
                    </article>
                )
            }))}
        </section>
    )
}