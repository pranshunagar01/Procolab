
import React, {useContext, useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Close, Done } from '@mui/icons-material';
import { Alert, Button, IconButton } from '@mui/material';
import MantineMenu from './MantineMenu';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { AppContexts } from './AppContexts';
import {Notification, Tooltip} from "@mantine/core"
import { CheckIcon } from '@modulz/radix-icons';
import FlashMessage from './FlashMessage';
import "@lottiefiles/lottie-player";
const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function ProjectsPage() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [realDataToShow, setrealDataToShow] = useState([]);
    const { code_server, chat_server,main_server, ProjectsPageVisibility, setProjectsPageVisibility, currentProjectShown, setcurrentProjectShown, TextBoxVisibility, setTextBoxVisibility, vieworedit, setvieworedit} = useContext(AppContexts);
    const setLanguage =(num)=>{
        if(num===10)return "Python"
        if(num===20)return "C/C++"
        if(num===30)return "Javascript"
        if(num===40)return "Java"
        
    }
    const [open, setOpen] = React.useState(false);
    const [wasDeleted, setwasDeleted] = useState(0);

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
    /*
    {
                    id: 1,
                    projectname: "My first C project",
                    language: "C/C++",
                    datecreated: new Date('04 Dec 1995 00:12:00 GMT'),
                    description: ["This is a simple example of my C/C++ knowledge I have applied to build a web application"],
                    collaborators: ["pranshunagar01@gmail.com", "pushkarnagar01@gmail.com", "abc.in", "xyz.abc", "fejwe.ife"],
                    permissions: "R-W-D",
                    admin: true
                },
                {
                    id: 2,
                    projectname: "My first Python project",
                    language: "Python",
                    datecreated: new Date('04 Dec 1995 00:12:00 GMT'),
                    description: ["This is a simple example of my C/C++ knowledge I have applied to build a web application"],
                    permissions: "R",
                    collaborators: ["pranshu.nagar@mavs.uta.edu", "john.doe@abc.in"],
                    admin: false
                }
    */
    const setPermissions = (num)=>{
        if(num === 0)return "R"
        if(num === 40)return "R-w"
        if(num === 100)return "R-W-D"
    }
    useEffect(() => {
        if(isAuthenticated)axios.get(main_server+"readProjectsCollaborator/"+user.email).then((resp)=>{setrealDataToShow(resp.data.map((e)=>{
            for(let  i =0; i < e.collaborators.length; i++){
                if(e.collaborators[i].email === user.email){
                    let adminship=e.collaborators[i].admin;
                    let permissionToShow= (e.collaborators[i].permissions === 0)? "R": ((e.collaborators[i].permissions === 40)? "R-W": "R-W-D")
                    return {id: e._id, projectname: e.title, language: ((e.language === "10")? "Python": ((e.language==="20")? "C/C++": (e.language === "30")?"Javascript": "Java")), datecreated: new Date(e.date), collaborators: e.collaborators, admin: adminship, permissions: permissionToShow}
                }
    
            }
              
            
        }))})
    }, [ProjectsPageVisibility, wasDeleted])
    
      
    const { data } = useDemoData({
        dataSet: 'Employee',
        visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
      });
      let colorArray = [
        "#04293A", "#0A91AB", "#FF004D", "#06C500", "#1F4287", "#595B83" ,"#C84B31"]
      const DataToShow = {
          columns: [
            {
                field: "id",
                filterable: false,
                hide: true,
                editable: false
            },
              {
                  field: "projectname",
                  filterable: false,
                  headerName: "Project Name",
                  sortable: true,
                  hide: false,
                  editable: false,
                  type: "string",
                  width: 220
              },
              {
                field: "language",
                filterable: true,
                headerName: "Language",
                sortable: false,
                hide: false,
                editable: false,
                type: "string",
                width: 120
            },
            {
                field: "collaborators",
                filterable: true,
                headerName: "Collaborators",
                sortable: false,
                hide: false,
                editable: false,
                type: "string",
                width: 220,
                renderCell: (cellValues)=>{
                    let arr = cellValues.row.collaborators;
                    return(
                        arr.map((e, index)=>(<Tooltip label={e.email} withArrow><div style={{display: 'inline-block',width: '30px', height: '30px', borderRadius: '50%', textAlign: 'center', margin: '2px', backgroundColor: colorArray[index], marginTop: '17px'}}><p style={{fontSize: '1.2rem', position: 'relative', bottom: '17px', fontWeight: 'bold', color: 'white'}}>{e.email.slice(0,1).toUpperCase()}</p></div></Tooltip>))
                    )
                }
            },
            
            {
                field: "datecreated",
                filterable: true,
                headerName: "Date created",
                sortable: true,
                hide: false,
                editable: false,
                type: "date",
                width: 120
            },
            
            {
                field: "permissions",
                filterable: true,
                headerName: "Permissions",
                sortable: true,
                hide: false,
                editable: false,
                type: "string",
                width: 120
            },
            {
                field: "admin",
                filterable: true,
                headerName: "Admin",
                sortable: true,
                hide: false,
                editable: false,
                type: "string",
                width: 120,
                renderCell: (cellValues)=>{
                    let arr = cellValues.row.admin;
                    return(
                        <IconButton>{(arr)?<Done/>:<Close/>}</IconButton>
                    )
                }
            },
            ,
            {
                field: "options",
                filterable: true,
                headerName: "Options",
                sortable: true,
                hide: false,
                editable: false,
                type: "string",
                width: 250,
                renderCell: (cellValues)=>{
                    let arr = cellValues.row.admin;
                    let perm = cellValues.row.permissions;
                    return(
                        <div>
                            {(perm==="R" || perm==="R-W" || perm==="R-W-D") && <Button style={{width: '60px', height: '30px', fontSize: '0.75rem', margin: '5px', backgroundColor: '#06c500'}} variant="contained" onClick={()=>{setvieworedit(0);setcurrentProjectShown(cellValues.row.id); setProjectsPageVisibility(false); setTextBoxVisibility(true)}} >View</Button>}
                            {(perm==="R-W" || perm==="R-W-D") && <Button style={{width: '60px', height: '30px', fontSize: '0.75rem', margin: '5px'}} variant="contained" onClick={()=>{setvieworedit(1) ;setcurrentProjectShown(cellValues.row.id); setProjectsPageVisibility(false); setTextBoxVisibility(true)}}>Edit</Button>}
                            {(perm==="R-W-D") && <Button style={{backgroundColor: 'red', width: '70px', height: '30px', fontSize: '0.75rem', margin: '5px'}} variant="contained" onClick={()=>{handleClick("The project was successfully deleted", "success"); axios.post(main_server+"deleteProject/", {id: cellValues.row.id}).then((resp)=>setwasDeleted(wasDeleted+1)).catch(e=>console.log(e)); if(currentProjectShown === cellValues.row.id){setTextBoxVisibility(false) ;setcurrentProjectShown("");}}}>Delete</Button>}
                            
                        </div>
                    )
                }
            }
          ],
          rows: realDataToShow
      }
      const [errorMessage, seterrorMessage] = useState("");
  const [severity, setSeverity] = useState("")
        return (
            
    ProjectsPageVisibility && (<div style={{width:'100%', height: '100%', zIndex:'2'}}>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap');
</style>
        <div style={{width: '100%',height: '100%', backgroundColor: '#efefef', position: 'absolute', top: '0', left: '0', zIndex: '3'}}></div>
            {(realDataToShow.length !== 0) && <div style={{ height: 500, width: '80%', position: 'absolute', top: '100px', left: '0', zIndex: '4', margin: '0 10%', textAlign: 'center',boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', backgroundColor: 'white'}}>
                <div style={{position: 'absolute', top: '10px', left: '13px'}}><MantineMenu/></div>
                <DataGrid style={{textAlign: 'center',height: '437px', border: 'solid 1px #efefef', backgroundColor: 'white', width:'98%', margin: '50px 1% 13px 1%'}} {...DataToShow} />
                <div ><Button onClick={()=>{setProjectsPageVisibility(false)}} style={{height: '30px', fontSize: '0.75rem', margin: '5px', position: 'absolute', top: '5px', right: '10px', backgroundColor: 'white', color: 'black'}} variant="contained">Cancel</Button></div>
            </div>}
            {(realDataToShow.length === 0) && <div style={{zIndex:'4', position: 'absolute', top: '50px', width:'100%', textAlign: 'center'}}><lottie-player src="https://assets6.lottiefiles.com/packages/lf20_o75swrf7.json"  background="transparent"  speed="1"  style={{width: '400px', height: '400px', display: 'inline-block'}}   autoplay></lottie-player>
            <p style={{fontSize: '2.5rem', fontFamily: 'Source Code Pro', position: 'relative', bottom: '30px'}}>{"No projects to show  :("}</p>
            <Button onClick={()=>{setProjectsPageVisibility(false)}} variant="contained" style={{position: 'relative', bottom: '20px', padding: '10px 20px'}}>Back to Homepage</Button>
            </div>}
            <FlashMessage errorMessage={"The project was successfully deleted"} handleClose={handleClose} open={open} severity={severity} />
    </div>)
  )
}
