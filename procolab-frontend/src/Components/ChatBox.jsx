import { useAuth0 } from '@auth0/auth0-react'
import { Button, TextInput, Tooltip} from '@mantine/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ReactTooltip from "react-tooltip";
import { AppContexts } from './AppContexts'
import './TextBox.css'
import SendIcon from '@mui/icons-material/Send';
import { IconContext } from 'react-icons';
import { IconButton } from '@mui/material';
export default function ChatBox() {
    const {code_server, chat_server,main_server, socket2, TextBoxVisibility, setTextBoxVisibility,currentProjectShown, setcurrentProjectShown , currentCode, setcurrentCode,vieworedit, setvieworedit, currentChats, setcurrentChats} = useContext(AppContexts);
    const { user, isAuthenticated, isLoading} = useAuth0();
    const [currentMessage, setcurrentMessage] = useState("");
    
    const onSendClick=()=>{
        if(currentMessage !== ""){
        let newMessage = {
            room: currentProjectShown,
            message: currentMessage,
            author: user.email,
            time: Date()
        }
        socket2.emit("send_message", newMessage);
        setcurrentChats((e)=>[...e, { message: currentMessage,author: user.email,time: Date()}])
        axios.post(main_server+"addMessageToChat/", {id:currentProjectShown,author: user.email, message: currentMessage}).catch((err)=>console.log(err));
        document.getElementById("messageInput").value="";
        if (document.getElementById("mainchatdiv")) {
            document.getElementById("mainchatdiv").scroll({ top: document.getElementById("mainchatdiv").scrollHeight, behavior: 'smooth'});
        }
    }
    }
    useEffect(() => {
        socket2.on("receive_message", (code)=>{
            //setcurrentChats((e)=>[...e, {message: code.message, author: code.author, time: code.time}]);
           setcurrentChats((currentChats)=>[...currentChats, code]);
           if (document.getElementById("mainchatdiv")) {
            document.getElementById("mainchatdiv").scroll({ top: document.getElementById("mainchatdiv").scrollHeight, behavior: 'smooth'});
        }
        })
    }, [socket2]);
      {<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
</style>}
  return (
    isAuthenticated && TextBoxVisibility && (currentProjectShown !== "") && <div className="chatboxdiv" style={{width: '27%', height: '352px', backgroundColor:'white', position :'absolute', right: '0', top: '250px', marginRight: '3.5%', marginLeft: '3.5%', padding: '0', minWidth:'260px', zIndex: '2'}}>
        <div id="mainchatdiv" style={{width: '97%', height: '295px', margin:'1.5%', backgroundColor: 'white', overflowY: 'scroll', overflowX: 'hidden'}}>
          {currentChats.map((e, index)=>(<div key={index} style={{display: 'block', textAlign: (e.author===user.email)?'right':'left', padding: '0'}}><Tooltip  wrapLines width={220} withArrow position={'bottom'} label={e.author+" "+new Date(e.time).getHours()+":"+new Date(e.time).getMinutes()+" - "+new Date(e.time).toDateString()}><div id="message-div" data-tip data-for="registerTip"  style={{backgroundColor: (e.author===user.email)? '#339af0': 'white', margin: '0px 5px',display: 'inline-block', maxWidth: '240px',overflowX: 'clip', padding: '8px 12px',fontSize: '0.93rem', textAlign: 'left', borderRadius: '12px', position: 'relative',fontFamily: 'Open Sans',boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px', color: (e.author=== user.email)?'white': 'black', cursor:'pointer'}} key={index}>
              
              <p style={{padding: '0', margin: '0', cursor:'pointer'}}>{e.message}</p>
              
              {/*<p style={{fontSize: '0.6rem', position: 'relative', left: '215px', top:'5px'}}>{new Date(e.time).getHours()+":"+new Date(e.time).getMinutes()}</p>*/}
          </div><br/></Tooltip>
          </div>
          ))}
        </div>
        <div>
        <TextInput onKeyPress={(event)=>{if(event.charCode === 13){onSendClick()}}} id="messageInput" onChange={(e)=>{setcurrentMessage(e.target.value)}} style={{width: '84.5%', display: 'inline-block', marginLeft: '1.5%', marginTop: '0.5%', position: 'absolute', left: '0'}} placeholder="Send something"/><IconButton onClick={onSendClick} style={{position: 'absolute', right: '2%', textAlign: 'center'}}><SendIcon style={{display: 'inline-block'}} /></IconButton>
        </div>
    </div>
  )
}
