export function MetricCard({title, value}) {
    return (
        <article className="metricCard">
            <span className="metricCardLabel">
                {title}
            </span>
            <strong className="metricCardValue">
                {value}
            </strong>
        </article>
    )
}