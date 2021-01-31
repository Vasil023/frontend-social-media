import React from 'react'
import {NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" class="brand-logo center">Logo</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><NavLink  href="sass.html">Sass</NavLink></li>
          
        </ul>
      </div>
  </nav>
  )
}