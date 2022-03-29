import { useAuth0 } from '@auth0/auth0-react';
import { Tooltip } from '@mantine/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContexts } from './AppContexts';
import SideBarList from './SideBarList';

import './TextBox.css'
export default function SideBar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {code_server, chat_server,main_server,currentProjectShown, setcurrentProjectShown} = useContext(AppContexts);
  const [dataToShow, setdataToShow] = useState({collaborators: [], description: ""});
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  useEffect(() => {
    if(currentProjectShown !== ""){
    axios.get(main_server+"particularProject/"+currentProjectShown).then((resp)=>setdataToShow(resp.data[0])).catch((err)=>console.log(err));}
  }, [currentProjectShown])
  
  return isAuthenticated && <div className="sidebar" style={{height: '137px',backgroundColor: 'white',width: '27%', display: 'inline-block', marginLeft: '3.5%', borderRadius: '0px', marginBottom: '2.5%', marginTop: '2.3%',position: 'absolute', right: '0',top: '70px', marginRight: '3.5%', textAlign: 'center'}}>
    <Tooltip position="bottom" label={dataToShow.description} style={{height: '30px', fontSize: '1.3rem', padding: '0', margin: '0', position: 'relative', top: '8px'}}><p style={{position: 'relative', bottom: '17px', fontFamily: 'Open Sans'}}>{dataToShow.title}</p></Tooltip>
    {(dataToShow !== {}) && <SideBarList data={dataToShow.collaborators} />}
  </div>;
}
