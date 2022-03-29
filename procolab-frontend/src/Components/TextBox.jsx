import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useContext, useState , useEffect} from 'react';
import  io  from 'socket.io-client';
import { AppContexts } from './AppContexts';
import './TextBox.css'
import $ from "jquery";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { letterSpacing } from '@mui/system';
import MonacoEditor from "@uiw/react-monacoeditor";

export default function TextBox() {

  const [currentKey, setcurrentKey] = useState("");
  const { user, isAuthenticated, isLoading} = useAuth0();
  const [currentKeyPressed, setcurrentKeyPressed] = useState("");
  const {socket, codelanguage, setcodelanguage, TextBoxVisibility, setTextBoxVisibility,currentProjectShown, setcurrentProjectShown , currentCode, setcurrentCode,vieworedit, setvieworedit, currentChats, setcurrentChats} = useContext(AppContexts);
  <style>@import url('https://fonts.googleapis.com/css2?family=Lato&family=Source+Code+Pro&display=swap');</style>
  const [seconds, setSeconds] = useState(0);
  function sendCode(){
    let chars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let vowel = /[aeouy]/
    if(chars.test(currentKeyPressed) || currentKeyPressed === " " || vowel.test(currentKeyPressed) || currentKeyPressed === "Enter" || currentKeyPressed === "Shift" || currentKeyPressed === "Backspace"){
      let tobesent = {
        room: currentProjectShown,
        code: currentCode,
        author: user.email
      }
      socket.emit("send_code", tobesent);
      
    }
  }
  useEffect(() => {
    sendCode();
  }, [currentCode])
  useEffect(() => {
    socket.on("receive_code", (data)=>{
      if(data.author !== user.email){
        setcurrentCode(data.code);
      }
    })
  }, [socket]);

  return(
    
  isAuthenticated&& TextBoxVisibility  && <div className="textbox" style={{width: '63%', height: '500px', display: 'inline-block', marginLeft: '3%', marginTop: '2.5%', borderRadius: '10px 10px 10px 10px', marginBottom: '2.5%', textAlign:'left', position: 'absolute', left: '0', outline: 'none', zIndex:'1', backgroundColor: '#e3e3e3', border: 'none', padding: '0', paddingTop: '30px'}}>
  <style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Source+Code+Pro&display=swap');
</style>
    <div style={{position: 'absolute', top: '5px', left: '10px'}}>
      <div style={{width: '13px', height: '13px', backgroundColor :'#ff6159', borderRadius: '50%', display: 'inline-block', marginRight: '8px'}}></div>
      <div style={{width: '13px', height: '13px', backgroundColor :'#ffbf2f', borderRadius: '50%', display: 'inline-block', marginRight: '8px'}}></div>
      <div style={{width: '13px', height: '13px', backgroundColor :'#25cc3e', borderRadius: '50%', display: 'inline-block', marginRight: '8px'}}></div>
    </div>
    {(codelanguage === "cpp") && <div style={{position: 'absolute', top: '3px', right: '6px'}}><img src="https://img.icons8.com/color/25/000000/c-plus-plus-logo.png"/></div>}
    {(codelanguage === "python") && <div style={{position: 'absolute', top: '3px', right: '6px'}}><img src="https://img.icons8.com/color/25/000000/python--v2.png"/></div>}
    {(codelanguage === "javascript") && <div style={{position: 'absolute', top: '3px', right: '6px'}}><img src="https://img.icons8.com/color/25/000000/javascript--v1.png"/></div>}
    {(codelanguage === "java") && <div style={{position: 'absolute', top: '3px', right: '6px'}}><img src="https://img.icons8.com/ios/25/000000/java-coffee-cup-logo--v1.png"/></div>}
  <div className="subdiv" style={{width: '100%', height: '470px', overflowY: 'scroll', backgroundColor: '#1e1e1e', color: 'white', padding: '0', borderRadius :'0 0 10px 10px'}}>
  {(vieworedit === 1)? <MonacoEditor
  language={codelanguage}
  onChange={(e)=>{setcurrentCode(e);}}
  value={currentCode}
  options={{
    theme: 'vs-dark',
  }}
  data-gramm="false"
  data-gramm_editor="false"
  data-enable-grammarly="false"
  style={{margin: '0'}}
/> :
<MonacoEditor
  language={codelanguage}
  value={currentCode}
  options={{
    theme: 'vs-dark',
  }}
  data-gramm="false"
  data-gramm_editor="false"
  data-enable-grammarly="false"
  style={{margin: '0'}}
  disabled
/>

  }
  {document.addEventListener('keydown', (e)=>{setcurrentKeyPressed(e.key);})}
  </div>
</div>
  
  
    
  )
}





