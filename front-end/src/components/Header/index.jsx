import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <header className="appHeader">
            <nav className="appNav">
                <NavLink
                    end
                    className={({ isActive }) => 
                        isActive ? "navLink navLinkActive" : "navLink"
                    }
                    to="/dashboard"
                >
                    Dashboard
                </NavLink>

                <NavLink 
                    end
                    className={({ isActive }) => 
                        isActive ? "navLink navLinkActive" : "navLink"
                    }
                    to="/contacts"
                >
                    Contacts
                </NavLink>

                <NavLink 
                    end
                    className={({ isActive }) => 
                        isActive ? "navLink navLinkActive" : "navLink"
                    }
                    to="/contacts/new"
                >
                    New Contact
                </NavLink>
            </nav>
        </header>
    )
}