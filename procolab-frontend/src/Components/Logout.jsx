import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import './TextBox.css'
import { AppContexts } from "./AppContexts";


const Logout = () => {
  const {displaybox} = useContext(AppContexts);
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  return  (
    isAuthenticated &&
    <div className="logout" style={{padding: '17px 10px',width: '240px', position: 'absolute', top: '65px', right: '0', margin: '0', backgroundColor: 'white', borderRadius: '10px', textAlign: 'center', display: displaybox}}>
      <Profile/>
    <button style={{padding: '3% 5%', fontSize: '1rem', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px'}} onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
    </div>
  );
};

export default Logout;