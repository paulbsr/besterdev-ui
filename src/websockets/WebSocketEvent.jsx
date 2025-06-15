import React, { useEffect, useState } from 'react';

const WebSocketEvent = () => {
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
            const body = message.body;
            setParams(body);
          });
        },
      });

      client.activate();

      return () => { client.deactivate(); };
    }
  },

    []
  );

  // return (
  //   <div style={{ fontFamily: "Segoe UI", fontSize: "10pt", color: "rgb(3, 25, 48)", fontStyle: "italic" }}>
  //     {(() => {
  //       const parts = params.split('|').map(p => p.trim());
  //       const time = parts.find(p => p.startsWith('Time:'))?.replace('Time:', '').trim();
  //       const name = parts.find(p => p.startsWith('Name:'))?.replace('Name:', '').trim();
  //       const desc = parts.find(p => p.startsWith('Desc:'))?.replace('Desc:', '').trim();

  //       return (
  //         <>
  //           Event @ {time} -- <strong>{name}: </strong> {desc}
  //         </>
  //       );
  //     }
  //     )
  //     ()
  //     }
  //   </div>
  // );

  return (
  <>
    {(() => {
      const parts = params.split('|').map(p => p.trim());
      const time = parts.find(p => p.startsWith('Time:'))?.replace('Time:', '').trim();
      const name = parts.find(p => p.startsWith('Name:'))?.replace('Name:', '').trim();
      const desc = parts.find(p => p.startsWith('Desc:'))?.replace('Desc:', '').trim();

      return (
        <span style={{ fontFamily: "Segoe UI", fontSize: "10pt", color: "rgb(3, 25, 48)", fontStyle: "italic" }}>
          Event @ {time} -- <strong>{name}:</strong> {desc}
        </span>
      );
    })()}
  </>
);

};

export default WebSocketEvent;

