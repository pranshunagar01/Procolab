import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { AppContexts } from "./AppContexts";


const Login = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const {displaybox} = useContext(AppContexts);
  return !isAuthenticated &&
  <div className="logout" style={{padding: '10px 10px',width: '240px', position: 'absolute', top: '65px', right: '0', margin: '0', backgroundColor: 'white', borderRadius: '10px', textAlign: 'center', display: displaybox}}>
    <p style={{fontSize: '1.1rem', letterSpacing:'1px'}}>Not logged in</p>
    <button style={{padding: '3% 5%', fontSize: '1rem', backgroundColor: '#008cba', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px'}} onClick={() => loginWithRedirect()}>
      Log In
    </button>
    </div>
   
};

export default Login;