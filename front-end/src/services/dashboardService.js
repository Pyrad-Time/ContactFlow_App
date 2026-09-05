const URL_API = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export async function getDashboardData() {
    const response = await fetch(`${URL_API}/dashboard`)

    if(!response.ok){
        throw new Error("Dashboard data not found")
    }

    return response.json()
}