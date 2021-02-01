import React, { useContext } from 'react'
import {NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import './Navbar.css'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo center">Logo</a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/user">Me</NavLink></li>
          <li><a href="/" onClick={logoutHandler} >Выйти</a></li>
        </ul>
      </div>
  </nav>
  )
}