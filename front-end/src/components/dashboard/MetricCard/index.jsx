export function MetricCard({title, value}) {
    return (
        <article>
            <h2>{title}</h2>
            <strong>{value}</strong>
        </article>
    )
}