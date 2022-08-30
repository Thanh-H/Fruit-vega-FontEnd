import React from 'react'
import './NavSystem.scss'
import { NavLink } from 'react-router-dom'
export const NavSystem = () => {
    return (
        <div class="topnav">
            <NavLink class="active" to="/manage-user">Home</NavLink>
            <NavLink class="active" to="/manage-product">Home</NavLink>
            <NavLink class="active" to="/system">Home</NavLink>
            <NavLink class="active" to="/system">Home</NavLink>
            <NavLink class="active" to="/system">Home</NavLink>

        </div>
    )
}