import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const chartColors = [
    "#4f46e5",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#64748b"
]

function formatStatus(status) {
    const statusLabels = {
        new: "New",
        in_contact: "In contact",
        client: "Client",
        partner: "Partner",
        archived: "Archived"
    }

    return statusLabels[status] || status
}

export function StatusSummary({ title, value = [] }) {
    const chartData = value.map((item) => {
        return {
            status: item.status,
            label: formatStatus(item.status),
            total: Number(item.total)
        }
    })

    return (
        <section className="dashboardCard">
            <h2>{title}</h2>

            {chartData.length === 0 ? (
                <p className="emptyState">No data found.</p>
            ) : (
                <>
                    <div className="chartBox">
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="total"
                                    nameKey="label"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={4}
                                >
                                    {chartData.map((item, index) => {
                                        return (
                                            <Cell
                                                key={item.status}
                                                fill={chartColors[index % chartColors.length]}
                                            />
                                        )
                                    })}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <ul className="dashboardList">
                        {chartData.map((item, index) => {
                            return (
                                <li className="dashboardListItem" key={item.status}>
                                    <span
                                        className="chartLegendDot"
                                        style={{
                                            backgroundColor: chartColors[index % chartColors.length]
                                        }}
                                    />

                                    <span>{item.label}</span>

                                    <strong>{item.total}</strong>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}
        </section>
    )
}