// Axios is a promise-based HTTP client for the browser and node.js
import axios from "axios";

// useEffect and useState are hooks that allow you to use state and other React features without writing a class
import { useEffect, useState } from "react";

// io is a library that allows you to communicate with a websocket server
import { io } from "socket.io-client";

// AppContexts is a context that allows you to pass data through the component tree without having to pass props down manually at every level
import { AppContexts } from "./Components/AppContexts";

// Import components here
import ChatBox from "./Components/ChatBox";
import CreateNew from "./Components/CreateNew";
import Loading from "./Components/Loading";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import ProjectsPage from "./Components/ProjectsPage";
import SideBar from "./Components/SideBar";
import TextBox from "./Components/TextBox";
import TextBoxButton from "./Components/TextBoxButton";

// lottie-player is a web component that allows you to play animations exported from Adobe After Effects
import "@lottiefiles/lottie-player";

// react-player is a React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion
import ReactPlayer from 'react-player'

// auth-0 react is a library that allows you to use Auth0 with React
import { useAuth0 } from "@auth0/auth0-react";

// import MainPage component here
import MainPage from "./Components/MainPage";

// code_server is a variable that stores the URL of the code server
const code_server ="https://procolab-code-server2.herokuapp.com/";

// chat_server is a variable that stores the URL of the chat server
const chat_server="https://procolab-code-server.herokuapp.com/";

// main_server is a variable that stores the URL of the main server that handles all the requests to the database
const main_server ="https://procolab-v1.herokuapp.com/";

// Connect to the code and chat servers using the io function
const socket = io.connect(code_server);
const socket2 = io.connect(chat_server);

// App is the main component of the application
export default function App() {
  // Define the styles for the app
  document.body.style.margin='0';
  document.body.style.paddingTop='67px';
  document.body.style.width='100%';
  document.body.style.height='100%';
  document.body.style.fontFamily="Open Sans"

  // Define the states for the app
  const [displaybox, setdisplaybox] = useState('none');

  // toggleProfile is a function that toggles the display of the profile page
  const toggleprofile = ()=>{
    if(displaybox === 'inline'){
      setdisplaybox('none');
    }
    else{
      setdisplaybox('inline')
    }
  }

  // Define the states for the app 
  const [createNew, setCreateNew] = useState(false);    
  const [TextBoxVisibility, setTextBoxVisibility] = useState();  
  const [wasCancelled, setwasCancelled] = useState(false);    
  const [currentProjectShown, setcurrentProjectShown] = useState("");    
  const [ProjectsPageVisibility, setProjectsPageVisibility] = useState(false); 
  const [currentCode, setcurrentCode] = useState("")
  const [vieworedit, setvieworedit] = useState(1); 
  const [currentChats, setcurrentChats] = useState([]);
  const [codelanguage, setcodelanguage] = useState("");

  // useEffect is a hook that allows you to use state and other React features without writing a class
  useEffect(() => {
    if(currentProjectShown === ""){
      setTextBoxVisibility(false);
    }
    else if(currentProjectShown !== ""){
    // Emit a request to the code server to get the code of the current project
    socket.emit("join_room", currentProjectShown);
    // Emit a request to the chat server to get the chats of the current project
    socket2.emit("join_room", currentProjectShown);
    // Emit a request to the main server to get the language of the current project
    axios.get(main_server+currentProjectShown).then((resp)=>{setcurrentCode(resp.data[0].code);setcurrentChats(resp.data[0].chats); if(resp.data[0].language === "10"){setcodelanguage("python")} else if(resp.data[0].language === "20"){setcodelanguage("cpp")} else if(resp.data[0].language === "30"){setcodelanguage("javascript")} else if(resp.data[0].language === "40"){setcodelanguage("java")}}).then(()=>setTextBoxVisibility(true)).catch((err)=>console.log(err));}
  }, [currentProjectShown]) 

  //useAuth0 is a hook that allows you to use Auth0 with React
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Return the JSX for the app
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
