import { useAuth0 } from '@auth0/auth0-react';
import { Alert, Button, GlobalStyles } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios, { Axios } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AddPeople from './AddPeople';
import { AppContexts } from './AppContexts';
import ChipsArray from './ChipsArray';
import CreateNewLanguage from './CreateNewLanguage';
import './TextBox.css'
export default function CreateNew() {
  const {code_server, chat_server,main_server, setCreateNew, createNew, TextBoxVisibility, setTextBoxVisibility, currentProjectShown, setcurrentProjectShown, vieworedit, setvieworedit} = useContext(AppContexts);
    const [showaddpeople, setshowaddpeople] = useState(false);
    const [currkey, setcurrkey] = useState(0);
    const [showmaxerror, setshowmaxerror] = useState(false);
    const [language, setlanguage] = useState(0);
    const toggleaddpeople = ()=>{
      setshowaddpeople(!showaddpeople);
    }
    
    const [chipData, setChipData] = useState([
    
    ]);
    useEffect(() => {
      if(chipData.length < 5){
        setshowmaxerror(false)
      }
    }, [chipData])
    useEffect(() => {
      if(!createNew){
        setChipData([]);
      }
    }, [createNew])
    
    const onAddTagClick = (emailadd, permissionsnum, adminbool)=>{
      if(chipData.length < 5){
      setChipData([...chipData, {key: currkey, label: String(emailadd)+" "+((adminbool)?"R-W-D":((permissionsnum === 0)?"R":((permissionsnum === 40)?"R-W": "R-W-D")))+" "+((adminbool === true)?"Admin":""), email: emailadd, permissions: (adminbool)?100:permissionsnum, admin: adminbool}]); 
      setcurrkey(currkey+1);
      
      }
      else{
        setshowmaxerror(true);
      }
    }
    
    const { user, isAuthenticated, isLoading } = useAuth0();
    let adminArray = ()=>{
      let adminArray = [];
      for(let i = 0; i < chipData.length; i++){
        if(chipData[i].admin){
          adminArray.push({email: chipData[i].email, permissions: chipData[i].permissions, admin: chipData[i].admin});
        }
      }
      if(user){
      adminArray.push({email: user.email, permissions: 100, admin: true});}
      return adminArray;
    }
    const [Title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [showemptyerror, setshowemptyerror] = useState(false);
    useEffect(() => {
      if(Title !== "" && language !== 0){
        setshowemptyerror(false);
      }
      else{
        setshowemptyerror(true);
      }
    }, [Title, language])
    
    const createProject = ()=>{
      let colabList = [];
      for(let i = 0; i < chipData.length; i++){
        colabList.push(chipData[i].email);
      }
      colabList.push(user.email);
      colabList.sort();
      let collaborators = [];
      for(let i = 0; i < chipData.length; i++){
        collaborators.push({email: chipData[i].email, permissions: chipData[i].permissions, admin: chipData[i].admin})
      }
      collaborators.push({email: user.email, permissions: 100, admin: true});
      let dataToSend = {
        id: Title+"-"+language+"-"+colabList.join('-'),
        admin: adminArray(),
        collaborators: collaborators,
        title: Title,
        description: description,
        language: language,
        code: ""
      }
      axios.post(main_server+"newProject", dataToSend).then((resp)=>console.log(resp)).catch((error)=>console.log(error)).then(setcurrentProjectShown(dataToSend.id));
    }

  return isAuthenticated && createNew && <div style={{width: '100%', height: '100%', position: 'absolute', top:'0', left:'0', zIndex: '2'}}>
      <div style={{width: '100%',height: '100%', backgroundColor: '#efefef', position: 'absolute', top: '0', left: '0', zIndex: '3'}}></div>
      <div className="createnewbox1" style={{width: '60%', height: '600px', backgroundColor: 'white', position: 'absolute', zIndex: '4', margin: '2% 10%', top: '70px', minWidth: '400px'}}>
        <div style={{ width: '100%', height: '600px', padding: '20px'}}>
          <div style={{marginBottom: '15px'}}>
            <TextField className="title" id="outlined" onChange={(e)=>setTitle(e.target.value)} label="Project name" color="primary" variant="outlined"/>
          </div>
          <div style={{marginBottom: '15px'}}>
            <CreateNewLanguage language = {language} setlanguage={setlanguage} />
          </div>
          <div>
          <TextField className="description" multiline={true} onChange={(e)=>{setdescription(e.target.value)}}  rows={2} id="outlined" label="Description" placeholder="Optional" color="primary" variant="outlined" fullWidth />
          </div>
          <div>
            <ChipsArray chipData = {chipData} setChipData={setChipData} />
          </div>
          <AddPeople toggle={toggleaddpeople} show={showaddpeople} chipData={chipData} setChipData ={setChipData} onAddTagClick={onAddTagClick} />
          <div>
            <Button size = "large" variant="contained" onClick={toggleaddpeople}>Add People</Button>
          </div>
          { !showemptyerror && showmaxerror && <Alert className="error" style={{margin: '0', position: 'relative', top: '15px'}} severity="warning">Max 5 people allowed</Alert>}
          {showemptyerror && <Alert className="error" style={{margin: '0', position: 'relative', top: '10px'}} severity="warning">No project name/ lang</Alert>}
          <div style={{position: 'absolute', bottom: '20px', right: '20px'}}>
          <Button size = "large" variant="contained" onClick={()=>{if(!showemptyerror){createProject() ;setCreateNew(!createNew); document.getElementsByClassName("title").value='';  document.getElementsByClassName("description").value=''; setTitle(''); setdescription(''); setChipData([]); setlanguage(0); setTextBoxVisibility(true);}}}>Create Project</Button>
          
          </div>
          <Button size="large" variant="contained" style={{position: 'absolute', top: '20px', right: '20px', backgroundColor: 'white', color: 'black'}} onClick={()=>{setCreateNew(!createNew);}}>Cancel</Button>
        </div>
      </div>
  </div>;
}