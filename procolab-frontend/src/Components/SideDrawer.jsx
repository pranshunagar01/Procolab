import {useState, Fragment, useContext} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useAuth0 } from '@auth0/auth0-react';
import logo from './logo.png'
import CircleIcon from '@mui/icons-material/Circle';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material';
import { AppContexts } from './AppContexts';
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
export default function SideDrawer() {
    const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
    const { TextBoxVisibility, setTextBoxVisibility, ProjectsPageVisibility, setProjectsPageVisibility,setCreateNew, createNew} = useContext(AppContexts);
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[(isAuthenticated)?((user.name.split(' ').length === 1)?user.nickname:user.name):"Not logged in",'New Project', 'All Projects', 'Settings'].map((text, index) => (
          (text === "All Projects")?<ListItem style={(text === "All Projects" && !isAuthenticated)? {display: 'none'}: {}} button key={text} onClick={()=>{setProjectsPageVisibility(true)}} >
            <ListItemIcon>
              {index === 0 ? ((isAuthenticated)?<img style={{width: '50px', borderRadius: '50%', marginRight: '15px'}} src={user.picture} alt="user_pic" />: <CircleIcon fontSize="large" />) : <MailIcon />}
            </ListItemIcon>
            
            <ListItemText primary={text} />
          </ListItem>:
          <ListItem style={((text === "New Project" || text === "Settings") && !isAuthenticated)? {display: 'none'}: {}} button key={text} onClick={()=>{if(text === "New Project"){setTextBoxVisibility(false);setProjectsPageVisibility(false); setCreateNew(!createNew)}}} >
          <ListItemIcon>
            {(text === "New Project")?<AddIcon/>: ((text === "All Projects")? <FormatListNumberedIcon/>:((text === "Settings")?<SettingsIcon/> :((isAuthenticated)?<img style={{width: '50px', borderRadius: '50%', marginRight: '15px'}} src={user.picture} alt="user_pic" />: <PersonIcon/>) ) )}
          </ListItemIcon>
          
          <ListItemText primary={text} />
        </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[(isAuthenticated)?'Logout':'Login/Register'].map((text, index) => (
          <ListItem  button key={text} onClick={()=>{if(isAuthenticated){logout({ returnTo: window.location.origin });} else{loginWithRedirect()}}}>
            <ListItemIcon>
              {(text === "Logout")? <LogoutIcon/> : <LoginIcon/>}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{position: 'absolute', top: '0', right: '10px', margin: '0'}}>
      {['right'].map((anchor) => (
          
        <Fragment key={anchor}>
            <IconButton onClick={toggleDrawer(anchor, true)}>
                <img  style={{width: '50px', margin: '0'}}  src={logo} alt="logo.png" />
                
            </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}