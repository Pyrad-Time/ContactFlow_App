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
                setIsLoading(true)
                setErr(null)
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
                <main className="page">
                    <section className="pageHeader">
                        <h1>Dashboard</h1>
                        <p>Loading you CRM overview...</p>
                    </section>
                    
                    <p className="stateMessage">Loading...</p>
                </main>
            )
        }

        if(err) {
            return (
                <main className="page">
                    <section className="pageHeader">
                        <h1>Dashboard</h1>
                        <p>Something went wrong while loading your data.</p>
                    </section>

                    <section className="errorState">
                        <h2>Error for loading dashboard metrics.</h2>
                        <p>Erro: {err}</p>
                    </section>
                </main>
            )
        }

    function getStatusTotal(status) {
        const statusItem = dashboardData.contactByStatus.find((item) => {
            return item.status === status
        })

        return statusItem ? Number(statusItem.total) : 0
    }

    const totalContacts = Number(dashboardData.totalContacts)
    const newContacts = getStatusTotal("new")
    const inContactContacts = getStatusTotal("in_contact")
    const clientContacts = getStatusTotal("client")
    const partnerContacts = getStatusTotal("partner")
    const archivedContacts = getStatusTotal("archived")

    return (
        <main className="page">
            <section className="pageHeader">
                <h1>Dashboard</h1>
                <p>Overview of your contacts, interactions, adn relationship pipeline</p>
            </section>
           
           <section className="dashboardMetrics">
                <MetricCard title="Total contacts" value={totalContacts}/>
                <MetricCard title="New contacts" value={newContacts}/>
                <MetricCard title="In contact" value={inContactContacts}/>
                <MetricCard title="Clients" value={clientContacts}/>
                <MetricCard title="Partners" value={partnerContacts}/>
                <MetricCard title="Archived" value={archivedContacts}/>
           </section>

            <section className="dashboardGrid">
                <StatusSummary 
                    title="Contacts by status" 
                    value={dashboardData.contactByStatus}
                />

                <ContactsBySource 
                    title="Contacts by source" 
                    value={dashboardData.contactBySource}
                />
            </section>

            <section className="dashboardGrid">
                <LatestContacts 
                    title="Latest contacts" 
                    value={dashboardData.latestedContacts}
                />

                <LatestInteractions 
                    title="Latest interactions" 
                    value={dashboardData.latestedInteractions}
                />
            </section>
        </main>
    )
}