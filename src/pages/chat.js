import { useEffect, useState } from 'react'
  import * as signalR from '@microsoft/signalr'
  
  
  export default function chat() {
      
    const [messages,setMessages] = useState([])
  
      useEffect(() => {
  
        const conexion = new signalR.HubConnectionBuilder()
        .withUrl('url')
        .build()
  
        conexion.on('histoy messages', (user,message) => {
          setMessages([...message, {user, message}]);
        })
  
        conexion.start()
        .then(() => {
            console.log("canal conectado")
        })
        .catch(() => {
            console.log("error al conectar")
        })
  
        return () => {
          conexion.stop()
        }
      },[messages])
  
  
      const handleMessage = async () => {
        const user = prompt("Ingrese su usuario")
        const msg = prompt("ingrese msg")

  
        if (msg?.length > 0 && user?.length > 0) {
            await conexion.invoke('new message', user, msg)
            setMessages([...messages,{user, msg}])
        } else {
          setMessages([{user: "no ingreso usuario", message: "no ingreso"}])
        }
      } 
  
      
      
    
    
    return (
      <>
        <button onClick={() => handleMessage()}>Conectar</button>

        <div>
          <h1>Messages</h1>
          {
          messages.map((message) => {
            <>
              <h3>{message.user};</h3>
              <strong>{message.message}</strong>
            </>
          })
        }
        </div>
      </>
    )
  }
  