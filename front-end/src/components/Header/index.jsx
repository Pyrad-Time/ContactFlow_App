import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <header>
            <nav>
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/contacts">
                    Contacts
                </NavLink>

                <NavLink to="/contacts/new">
                    New Contact
                </NavLink>
            </nav>
        </header>
    )
}