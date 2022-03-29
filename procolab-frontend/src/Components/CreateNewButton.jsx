import React, { useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AppContexts } from './AppContexts';
import { Button } from '@mui/material';

export default function CreateNewButton() {
    const {ProjectsPageVisibility, setProjectsPageVisibility,setCreateNew, createNew} = useContext(AppContexts);
    const { user, isAuthenticated, isLoading } = useAuth0();
  return isAuthenticated && <Button style={{marginTop: '80px', marginLeft: '30px', padding: '10px 25px'}}  onClick={()=>{setProjectsPageVisibility(false) ;setCreateNew(!createNew)}} size = "large" variant="contained">{(createNew)?"Cancel":"New Project"}</Button>;
}