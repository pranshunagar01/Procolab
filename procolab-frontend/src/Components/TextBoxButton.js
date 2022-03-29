import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContexts } from './AppContexts';
import FlashMessage from './FlashMessage';
import './TextBox.css'

export default function TextBoxButton() {
  const [open, setOpen] = React.useState(false);
    const [wasDeleted, setwasDeleted] = useState(0);

  const handleClick = (message, severe) => {
    setOpen(true);
    seterrorMessage(message);
    setSeverity(severe);
    
  };
  const [errorMessage, seterrorMessage] = useState("");
  const [severity, setSeverity] = useState("")
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {code_server, chat_server,main_server, TextBoxVisibility, setTextBoxVisibility,currentProjectShown, setcurrentProjectShown , currentCode, setcurrentCode, vieworedit, setvieworedit} = useContext(AppContexts);

  return isAuthenticated && (vieworedit === 1) && <div className="button" style={{position: 'absolute', left: '61%', top: '660px'}}>
  
      <Button onClick={()=>{axios.post(main_server+"updateCode", {id: currentProjectShown, newCode: currentCode}).then((resp)=>{console.log(resp);handleClick("The project was successfully deleted", "success")}).catch((err)=>console.log(err))}} className="actualbutton" style={{marginBottom: '20px'}} size = "large" variant="contained" >Save</Button>
      <FlashMessage errorMessage={"The project was successfully saved."} handleClose={handleClose} open={open} severity={severity} />
  </div>
}
