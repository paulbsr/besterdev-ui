import React, { useEffect, useState } from 'react';
import { TbBrandSocketIo } from "react-icons/tb";

const WebSocketComponent = () => {
  const [params, setParams] = useState("No SocketServer Event");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SockJS = require('sockjs-client');
      const { Client } = require('@stomp/stompjs');

      const socket = new SockJS('https://besterdev-api-13a0246c9cf2.herokuapp.com/ws');
      const client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => {
          console.log('Connected to WebSocket');
          client.subscribe('/topic/websocketmessage', (message) => {
            setParams(message.body);
          });
        },
      });

      client.activate();

      return () => { client.deactivate(); };
    }
  }, []);

  const handleClick = async () => {
    try {
      await fetch("https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/triggerwebsocketevent", {
        method: "GET",
      });
      console.log("WebSocket Endpoint hit successfully");
    } catch (error) {
      console.error("Error hitting WebSocket endpoint:", error);
    }
  };

  const parts = params.split('|').map(p => p.trim());
  const time = parts.find(p => p.startsWith('Time:'))?.replace('Time:', '').trim() || '';
  const name = parts.find(p => p.startsWith('Name:'))?.replace('Name:', '').trim() || '';
  const desc = parts.find(p => p.startsWith('Desc:'))?.replace('Desc:', '').trim() || '';

  return (

    <td onClick={handleClick}>

      <div
        style={{
          marginLeft: '20px',
          display: 'inline-block',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '2px 2px',
          backgroundColor: '#f9f9f9',
          width: '990px',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
          fontFamily: 'Segoe UI',
        }}
      >
        <TbBrandSocketIo
          title="Fetch a Bearer Token"
          style={{ color: '#4D4D4D', fontSize: '22px', cursor: 'pointer', verticalAlign: 'middle' }}
        />
        WebSocket:
        <span
          style={{
            fontFamily: 'Verdana',
            fontSize: '10pt',
            color: '#D5441C',
            fontStyle: 'italic',
            marginLeft: '4px',
          }}
        >
          (Event @ {time}) <strong>{name}:</strong> {desc}
        </span>
      </div>
      <div>&nbsp;</div>
    </td>


  );
};

export default WebSocketComponent;
