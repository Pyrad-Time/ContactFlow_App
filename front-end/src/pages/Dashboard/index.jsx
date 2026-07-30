import { useEffect, useState } from "react"
import { getDashboardData } from "../../services/dashboardService"
import { MetricCard } from "../../components/dashboard/MetricCard"
import { StatusSummary } from "../../components/dashboard/StatusSummary"
import { ContactsBySource } from "../../components/dashboard/ContactsBySource"
import { LatestContacts } from "../../components/dashboard/LatestedContacts"
import { LatestInteractions } from "../../components/dashboard/LatestedInteractions"

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

            <MetricCard title="Total de contatos" value={dashboardData.totalContacts}/>
            <MetricCard title="Total de interações" value={dashboardData.totalInteractions}/>
            <StatusSummary title="Todos Status" value={dashboardData.contactByStatus}/>
            <ContactsBySource title="Contatos por origem" value={dashboardData.contactBySource}/>
            <LatestContacts title="Últimos contatos" value={dashboardData.latestedContacts}/>
            <LatestInteractions title="Últimas interações" value={dashboardData.latestedInteractions}/>
        </main>
    )
}