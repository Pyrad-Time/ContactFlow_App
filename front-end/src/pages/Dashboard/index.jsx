import { useEffect, useState } from "react"
import { getDashboardData } from "../../services/dashboardService"

export function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState(null)

    useEffect(() => {
        async function fetchDashboardData() {
            try {
            const data = await getDashboardData()

            setDashboardData(data)
        } catch(error){
            setErr(error.message)
        } finally {
            setIsLoading(false)
        }
        }

        fetchDashboardData()
    }, [])

        if(isLoading) {
            return (
                <main>
                    <h1>Dashboard</h1>
                    <p>Carregando...</p>
                </main>
            )
        }

        if(err) {
            return (
                <main>
                    <h1>Dashboard</h1>
                    <p>Erro: {err}</p>
                </main>
            )
        }

    return (
        <main>
            <h1>Dashboard</h1>
            <pre>
                {JSON.stringify(dashboardData, null, 2)}
            </pre>
        </main>
    )
}