// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import '../Fonts.css';
// import { TbBrandSocketIo } from "react-icons/tb";

// const WebSocketEvent = () => {
//   const [params, setParams] = useState("SocketServer nothing published");

//   useEffect(() => {
//     const socket = new SockJS('https://besterdev-api-13a0246c9cf2.herokuapp.com/ws');
//     const client = new Client({
//       webSocketFactory: () => socket,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log('Connected to WebSocket');
//         client.subscribe('/topic/websocketmessage', (message) => {
//           // const body = JSON.parse(message.body);
//           const body = (message.body);
//           setParams(body);
//         });
//       },
//     });

//     client.activate();

//     return () => {
//       client.deactivate();
//     };
//   }, []);

//   return (
//     <div>
//       <td style={{ fontFamily: "Segoe UI", fontSize: "small", color: "rgb(148, 196, 245)" }}>Latest WebSocket Event: <b>{params}</b></td>
      
//     </div>
//   );
// };

// export default WebSocketEvent;


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

      return () => {
        client.deactivate();
      };
    }
  }, []);

  return (
    // <div>
    //   <td style={{ fontFamily: "Segoe UI", fontSize: "small", color: "rgb(148, 196, 245)" }}>
    //     Latest WebSocket Event: <b>{params}</b>
    //   </td>
    // </div>

  //   <div style={{ fontFamily: "Segoe UI", fontSize: "10pt", color: "rgb(148, 196, 245)" }}>
  //   <div>Latest WebSocket Event:</div>
  //   {params.split('|').map((item, index) => (
  //     <div key={index}>{item.trim()}</div>
  //   ))}
  // </div>

<div style={{ fontFamily: "Segoe UI", fontSize: "8pt", color: "rgb(77, 77, 77)" }}>
{(() => {
  const parts = params.split('|').map(p => p.trim());
  const time = parts.find(p => p.startsWith('Time:'))?.replace('Time:', '').trim();
  const name = parts.find(p => p.startsWith('Name:'))?.replace('Name:', '').trim();
  const desc = parts.find(p => p.startsWith('Desc:'))?.replace('Desc:', '').trim();

  return (
    <>
      <div>
        Latest WebSocket Event: <strong>{time}</strong>
      </div>
      <div>
        <strong>{name}: </strong> {desc}
      </div>
    </>
  );
})()}
</div>
  );
};

export default WebSocketEvent;

