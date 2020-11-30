import React from 'react';

export interface NavbarItemProps {
    href : string,
    text : string,
    active: boolean,
}

export const NavbarItem : React.FC<NavbarItemProps> = ({href, text, active}) => {
    const determineClass = () => {
        if (active) {
            return 'app-navbar-link active';
        } else {
            return 'app-navbar-link';
        }
    }
    
    return (
        <li className={determineClass()}>
            <a href={href}>{text}</a>
        </li>
    )
}
