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
