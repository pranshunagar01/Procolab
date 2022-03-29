import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AppContexts } from "./Components/AppContexts";
import ChatBox from "./Components/ChatBox";
import CreateNew from "./Components/CreateNew";
import Loading from "./Components/Loading";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import ProjectsPage from "./Components/ProjectsPage";
import SideBar from "./Components/SideBar";
import TextBox from "./Components/TextBox";
import TextBoxButton from "./Components/TextBoxButton";
import "@lottiefiles/lottie-player";
import ReactPlayer from 'react-player'
import { useAuth0 } from "@auth0/auth0-react";
import MainPage from "./Components/MainPage";
const code_server ="https://procolab-code-server2.herokuapp.com/";
  const chat_server="https://procolab-code-server.herokuapp.com/";
  const main_server ="https://procolab-v1.herokuapp.com/";
const socket = io.connect(code_server);
const socket2 = io.connect(chat_server);
export default function App() {
  
  document.body.style.margin='0';
  document.body.style.paddingTop='67px';
  document.body.style.width='100%';
  document.body.style.height='100%';
  document.body.style.fontFamily="Open Sans"
  const [displaybox, setdisplaybox] = useState('none');
  const toggleprofile = ()=>{
    if(displaybox === 'inline'){
      setdisplaybox('none');
    }
    else{
      setdisplaybox('inline')
    }
    
  }
  const [createNew, setCreateNew] = useState(false);    
  const [TextBoxVisibility, setTextBoxVisibility] = useState();  
  const [wasCancelled, setwasCancelled] = useState(false);    
  const [currentProjectShown, setcurrentProjectShown] = useState("");    
  const [ProjectsPageVisibility, setProjectsPageVisibility] = useState(false); 
  const [currentCode, setcurrentCode] = useState("")
  const [vieworedit, setvieworedit] = useState(1); 
  const [currentChats, setcurrentChats] = useState([]);
  const [codelanguage, setcodelanguage] = useState("");

  useEffect(() => {
    if(currentProjectShown === ""){
      setTextBoxVisibility(false);
    }
    else if(currentProjectShown !== ""){
    socket.emit("join_room", currentProjectShown);
    socket2.emit("join_room", currentProjectShown);
    axios.get(main_server+currentProjectShown).then((resp)=>{setcurrentCode(resp.data[0].code);setcurrentChats(resp.data[0].chats); if(resp.data[0].language === "10"){setcodelanguage("python")} else if(resp.data[0].language === "20"){setcodelanguage("cpp")} else if(resp.data[0].language === "30"){setcodelanguage("javascript")} else if(resp.data[0].language === "40"){setcodelanguage("java")}}).then(()=>setTextBoxVisibility(true)).catch((err)=>console.log(err));}
  }, [currentProjectShown]) 
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      <AppContexts.Provider value={{code_server, chat_server,main_server, socket2, socket,codelanguage,setcodelanguage,toggleprofile, wasCancelled, setwasCancelled, displaybox, createNew, setCreateNew, TextBoxVisibility, setTextBoxVisibility, currentProjectShown, setcurrentProjectShown, ProjectsPageVisibility, setProjectsPageVisibility, currentCode, setcurrentCode, vieworedit, setvieworedit, currentChats, setcurrentChats}}>
      <Navbar/>
      
      
      { TextBoxVisibility && <TextBox/>}
      { TextBoxVisibility && <SideBar/>}
      { TextBoxVisibility && <TextBoxButton/>}
      {!createNew && !TextBoxVisibility && <MainPage/>}
      <CreateNew/>
      <Loading/>
      <ProjectsPage/>
      <ChatBox/>
      </AppContexts.Provider>
    </div>
  );
}
