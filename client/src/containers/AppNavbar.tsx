import React from 'react';
import { NavbarItem } from '../components/AppNavbar/NavbarItem';
import { NavbarList } from '../components/AppNavbar/NavbarList';

export const AppNavbar : React.FC = () => {

    return (
        <nav className="app-navbar">
            <NavbarList>
                <NavbarItem href="/" text="Homepage" />
            </NavbarList>
            <NavbarList float={1}>
                <NavbarItem href="/logout" text="Logout" />
                <NavbarItem href="/login" text="Login" />
            </NavbarList>
        </nav>
    )
}