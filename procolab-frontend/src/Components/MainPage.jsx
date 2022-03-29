import React, { useContext } from 'react'
import { AppContexts } from './AppContexts';
import CreateNewButton from './CreateNewButton';
import Grid from '@mui/material/Grid';
import './TextBox.css'
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function MainPage() {
    const {createNew, setCreateNew, ProjectsPageVisibility, setProjectsPageVisibility, currentProjectShown, setcurrentProjectShown, TextBoxVisibility, setTextBoxVisibility, vieworedit, setvieworedit} = useContext(AppContexts);
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return (
    !TextBoxVisibility && <Grid style={{width: '100%', marginTop: '80px'}} container spacing={4}><div>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
</style>
        <Grid item lg={6} md={10} xs={10} style={{fontWeight: '900', display:'inline-block', position: 'relative', bottom: '80px', marginLeft: '2%'}}><div className="font" style={{fontFamily: 'Montserrat, sans serif', fontSize: '3.8rem', lineHeight: '150%', display: 'inline-block', textAlign: 'left', marginLeft: '30px', textDecoration: 'none'}}><span style={{textDecoration: 'underline', textDecorationThickness: '3px', WebkitTextDecorationColor:'#1976D2'}}>Pro</span> tool for <br/><span style={{fontSize: '4.5rem', color: '#1976D2'}}><span style={{fontSize: '4.5rem'}}><span style={{backgroundColor: '#1976d2', color: 'white'}}>col</span><span style={{ textDecorationThickness: '3px',backgroundColor: '#1976d2', color: 'white'}}>lab</span>orative</span> <br/><span style={{color: 'black'}}><span style={{textDecoration: 'underline', textDecorationThickness: '3px'}}>co</span>ding</span></span></div>
        <div className="buttonmainpage" style={{display: 'inline-block'}}><Button variant="contained" onClick={()=>{if(isAuthenticated){setCreateNew(true)} else{loginWithRedirect()}}} style={{padding: '8px 15px', marginLeft: (isAuthenticated)? '30px': '0', width: '170px'}}>{(isAuthenticated)? "Make a Project": "Sign in Now"}</Button></div>
        </Grid>
        <Grid item lg={6} md={10} xs={11} style={{ display:'inline-block', textAlign: 'left', position: 'relative', left: '10%', padding: '0'}}><img className="image" style={{width: '95%', margin: '0'}} draggable="false" src="https://i.imgur.com/hbZ6zZp.gif" alt="img"  /></Grid>
      </div>
      </Grid>
  )
}
