const URL_API = "http://localhost:3000/api"

export async function getDashboardData() {
    const response = await fetch(`${URL_API}/dashboard`)

    if(!response.ok){
        throw new Error("Dashboard data not found")
    }

    return response.json()
}