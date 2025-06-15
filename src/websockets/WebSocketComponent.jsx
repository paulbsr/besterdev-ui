import React, { useEffect, useState } from 'react';
import { TbBrandSocketIo } from "react-icons/tb";
import spacer from '../graphix/besterdev_spacer_white.png';

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
      <div>&nbsp;</div>
      <img alt="spacer" src={spacer} />
      <TbBrandSocketIo title="Fetch a Bearer Token" style={{ color: '#4D4D4D', fontSize: '22px', cursor: 'pointer' }} />&nbsp;
      WebSocket:
      <span style={{ fontFamily: "Verdana", fontSize: "10pt", color: "#D5441C", fontStyle: "italic" }}> (Event @ {time}) <strong>{name}:</strong> {desc}</span>
    </td>
  );
};

export default WebSocketComponent;
