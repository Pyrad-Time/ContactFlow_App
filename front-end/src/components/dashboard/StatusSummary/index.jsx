export function StatusSummary({title, value}) {
    return (
        <section>
            <h2>{title}</h2>
            {value.length === 0 ? (
                <p>Nenhum dado encontrado</p>
            ) : (value.map((data) => {
            return (
                <article key={data.status}>
                    <p>
                        <strong>Status: </strong>{data.status}
                    </p>
                    <p>
                        <strong>Total: </strong>{data.total}
                    </p>
                </article>
                )  
            }))}
        </section>
        
    )
}