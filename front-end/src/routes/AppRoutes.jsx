import { Routes, Route, Navigate } from "react-router-dom"

import { ContactDetails } from "../pages/ContactDetails"
import { Contacts } from "../pages/Contacts"
import { Dashboard } from "../pages/Dashboard"
import { EditContact } from "../pages/EditContact"
import { NewContact } from "../pages/NewContact"

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/dashboard"} />}/>
            <Route path="/contacts" element={ <Contacts/> }/>
            <Route path="/contacts/new" element={ <NewContact/> }/>
            <Route path="/contacts/:id/edit" element={ <EditContact/> }/>
            <Route path="/contacts/:id" element={ <ContactDetails/> }/>
            <Route path="/dashboard" element={ <Dashboard/> }/>
        </Routes>
    )
}