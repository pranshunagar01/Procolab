import { useAuth0 } from '@auth0/auth0-react'
import { Button, TextField, MenuItem, Select, InputLabel, Switch, FormControlLabel, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './AddPeople.css'
import DiscreteSliderValues from './DiscreteSliderValues'
import FlashMessage from './FlashMessage'
import TogglePersonStatus from './TogglePersonStatus'
export default function AddPeople(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [emailaddress, setemailaddress] = useState("")
  const [admin, setadmin] = useState(false)
  const [permissions, setpermissions] = useState(0);
  const [showerror, setshowerror] = useState(true);
  const [errorMessage, seterrorMessage] = useState("");
  const [severity, setSeverity] = useState("")
  
  function ValidateEmail(mail) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    return (true)
  }
    return (false)
}
  useEffect(() => {
    if(ValidateEmail(emailaddress)){
      setshowerror(false);
    }
    else{
      setshowerror(true);
    }
  }, [emailaddress])
  
  const [open, setOpen] = React.useState(false);

  const handleClick = (message, severe) => {
    setOpen(true);
    seterrorMessage(message);
    setSeverity(severe);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const addPeopleunc = ()=>{
    props.onAddTagClick(emailaddress, permissions, admin);
    setemailaddress("");
    setadmin(true); 
    setpermissions(0); 
    props.toggle();
  }
  return (
    props.show && <div>
      <div className="glassdiv" style={{width: '100%', height: '100%', zIndex: '5', position: 'absolute', top: '0', left: '0'}}></div>
    <div className="addpeoplediv" style={{width: '80%',marginLeft: '10%', marginRight: '10%', height: '420px', position: 'absolute',top: '80px',left: '0', zIndex: '6', backgroundColor:'white'}}>
    <TextField inputProps={{ maxLength: 40 }} onBlur={(e)=>{setemailaddress(e.target.value)}} style={{margin: '20px'}} id="outlined" label="e-mail address" color="primary" variant="outlined"/>
    <div style={{margin: '10px 0 10px 25px'}}><InputLabel id="demo-simple-select-label">Permissions</InputLabel></div>
    <DiscreteSliderValues permissions={permissions} setpermissions={setpermissions} />
    <div style={{margin: '30px 30px 40px 30px'}}><FormControlLabel  control={<Switch onChange={(e)=>setadmin(e.target.checked)}/>} label="Admin access" /></div>
    {showerror && <Alert style={{margin: '0', position: 'relative', bottom: '20px'}} severity="warning">Enter a valid email address</Alert>}
    <FlashMessage errorMessage={errorMessage} handleClose={handleClose} open={open} severity={severity} />
      <Button onClick={()=>{setemailaddress(""); setadmin(true); setpermissions(0); props.toggle();}} style={{position: 'absolute', bottom: '18px', right:'18px'}} size = "large" variant="contained" >Cancel</Button>
      <Button onClick={()=>{if(!showerror){if(emailaddress === user.email){handleClick("You can't enter your own email address", "warning")} else {let flag = 0; for(let i = 0; i < props.chipData.length; i++){if(props.chipData[i].email === emailaddress){flag = 1}}; if(flag === 1){handleClick("The user has already been added", "warning")} else{addPeopleunc();}}}}} style={{position: 'absolute', bottom: '18px', right: '140px'}} size = "large" variant="contained" >Add</Button>
    </div>
    </div>
  )
}
