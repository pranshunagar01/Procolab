import React, { useState } from 'react';
import './TextBox.css'
import Logoname from './procolab.png'
import Login from './Login';
import Logout from './Logout';
import logo from './logo.png'
import { useContext } from 'react';
import { AppContexts } from './AppContexts';
import { useAuth0 } from "@auth0/auth0-react";
import CreateNewButton from './CreateNewButton';
import SideDrawer from './SideDrawer';
import FlashMessage from './FlashMessage'

export default function Navbar() {
  const { TextBoxVisibility, setTextBoxVisibility, ProjectsPageVisibility, setProjectsPageVisibility,toggleprofile, wasCancelled, setwasCancelled} = useContext(AppContexts)
  return <div className="navbar" style={{width: '100%', height: '65px', position: 'fixed', top: '0', left: '0', margin: '0', padding: '0', backgroundColor: 'white', zIndex: '5'}}>
      <img draggable="false" style={{width: '150px', marginTop: '15px', marginLeft: '15px', cursor: 'pointer'}} src={Logoname} alt="logoname" />
      <SideDrawer/>
  </div>
  }
