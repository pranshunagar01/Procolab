import {useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { IconButton} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {Notification, Tooltip} from "@mantine/core";
import "./TextBox.css"
const style = {
  width: '96%',
  
  bgcolor: 'background.paper',
  padding: '0'
};

export default function ListDividers(props) {

  return (
     <List className="sidebarlist" style={{textAlign: 'center', width: '100%', height: '90px', overflowY: 'scroll'}} sx={style} component="nav" aria-label="mailbox folders">
        <Divider />
      {
           props.data.map((e, index)=>
          <ListItem key={index} style={{display: 'inline-block', margin: '0',marginTop: '10px', padding: '0', width: '60px',height: '90px'}} >

            <Tooltip style={{position: 'absolute', top: '0px', left: '11px',height: '50px',width: '47px', display: 'block'}} label={e.email}><div style={{width: '45px', height: '45px' ,minHeight: '45px',minWidth: '45px', borderRadius: '50%',position: 'absolute', top: '0', backgroundColor: ["red", "green", "#16A085", "#E67E22", "black", "#2E4053"][index], margin: '0', fontFamily: 'sans-serif', textAlign:'center', }}><p style={{fontSize:'1.7rem', fontWeight: 'bolder', color: 'white', position: 'relative', bottom: '20px'}}>{e.email[0].toUpperCase()}</p></div></Tooltip>
            {(e.admin) && <Tooltip position="bottom" label="Admin" style={{position: 'absolute', bottom: '8px', left: '13px'}}><IconButton><PersonIcon  /></IconButton></Tooltip>}
            {(!e.admin) && <Tooltip position="bottom" label={(e.permissions===0)?"Read":((e.permissions === 40)?"Read and Edit": "Read, Edit and Delete")} style={{position: 'absolute', bottom: '5px', left: '13px'}}><IconButton><p style={{fontSize: '0.6rem'}}>{(e.permissions===0)?"R":((e.permissions === 40)?"R-W": "R-W-D")}</p></IconButton></Tooltip>}
            </ListItem>
          )
      }
    </List>
  );
}