import { Link } from "react-router-dom"

export function LatestInteractions({ title, value = []}) {
    function formatDate(dateValue) {
        if(!dateValue) {
            return "Not specified"
        }

        return new Date(dateValue).toLocaleString("pt-BR", {
            timeStyle: "short",
            dateStyle: "short"
        })
    }
    return (
        <section className="dashboardCard">
            <h2>{title}</h2>

            {value.length === 0 ? (
                <p className="emptyState">No interactions found.</p>
            ) : (
                <div className="latestList">
                    {value.slice(0, 10).map((interaction) => {
                        return (
                            <Link 
                                key={interaction.id}
                                className="latestInteractionItem"
                                to={`/contacts/${interaction.contact_id}`}
                            >
                                <div className="latestInteractionHeader">
                                    <strong>
                                         {interaction.contact_name || "Unknown contact"}
                                    </strong>
                                    <br />
                                    <small>
                                        Created at: {formatDate(interaction.created_at)}
                                    </small>
                                </div>
                                    <p>{interaction.content}</p>                       
                            </Link>
                        )
            })}
                </div>
            )}
        </section>
    )
}