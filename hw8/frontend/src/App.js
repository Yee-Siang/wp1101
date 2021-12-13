import { useEffect, useState ,useRef} from 'react'
import './App.css'
import { Button, Input,Tag,message } from 'antd'
import { UserOutlined,AppleOutlined  } from '@ant-design/icons';
import useChat from './useChat'
import styled from 'styled-components';
import SkeletonButton from 'antd/lib/skeleton/Button'


function App() {
  const {status, messages, sendMessage,clearMessages,Username} = useChat()
  const [username, setUsername] = useState("")
  const [body, setBody] = useState("")
  const [signin,setSignin]=useState(false)
  const [defaults, setDefaults] = useState(true)
  const bodyRef = useRef(null)
  const displayStatus = (payload) => {
    if (payload.msg) {
      const {type,msg} = payload
      const content = {
        content:msg,duration:0.5
      }
      switch (type){
        case "success":
          message.success(content)
          break
        case "error":
        default:
          message.error(content)
          break

      }
    }
  }
  useEffect(()=>{
    displayStatus(status)
  },[status]
  )
  
    
  
  
  const NotSignin=(
    <div className="App">
      
        <h1><AppleOutlined />Simple Chat</h1>
        <h1>Please sign in !!</h1>
      
    
      <Input.Search
        prefix={<UserOutlined />}
        value={(username==="" && defaults===true) ? Username :  username  }
        onChange={(e) => {setUsername(e.target.value);console.log(username,Username);setDefaults(false);console.log(Username)}}
        enterButton="Sign In"
        placeholder="Type your username here..."
        onSearch={(username) => {
          console.log(Username,username,defaults)
          console.log(Username.length===0)


          if (defaults===false && !username){
            displayStatus({
              type:"error",
              msg:"empty input"
            })
            return
          }
          if (defaults===true && Username.length===0){
            displayStatus({
              type:"error",
              msg:"empty input"
            })
            console.log(1111)
            return
          }
          else if (!Username.length===0){
          console.log(Username)
          console.log(2222)
          sendMessage({ name: Username, body: `System signal : ${Username} has joined the chat room !!`})
          }
          else {
            console.log(3333)
            console.log(Username)
          sendMessage({ name: username, body: `System signal : ${username} has joined the chat room !!`})
          }
          setSignin(true)
        }}
      ></Input.Search>
      
    </div>
  )


  const HasSignin=( 
    <div className="App">
      <div className="App-title">
        <h1>{defaults===true ? Username :  username} 's Chat Room</h1>
        <Button 
        type="primary" 
        danger
        onClick={clearMessages} >
          Clear
        </Button>
      </div>
      
      <div className="App-messages">
        {messages.length === 0 ? (
          
          <p style={{color: "#ccc"}}> No messages </p> 
        ):(
          messages.map(({name,body},i) => (
          <p className="App-message" key={i}>
            <Tag color="blue">{name}</Tag>{body}
          </p>))
        )
        }
      </div>

      
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg ){
            displayStatus({
              type:"error",
              msg:"empty input"
            })
            return
          }
          sendMessage({ name: defaults===true ? Username :  username, body: msg})
          setBody("")
        }}
      ></Input.Search>
    </div>)
  


  return (signin ? HasSignin : NotSignin )
}

export default App
