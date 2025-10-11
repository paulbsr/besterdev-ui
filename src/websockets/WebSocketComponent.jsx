import React, { useEffect, useState, useCallback } from "react";
import { TbBrandSocketIo } from "react-icons/tb";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const SOCKET_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/ws";
const TRIGGER_URL = "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/triggerwebsocketevent";

const parseParams = (params) => {
  const parts = params.split("|").map((p) => p.trim());
  return {
    time: parts.find((p) => p.startsWith("Time:"))?.replace("Time:", "").trim() || "",
    name: parts.find((p) => p.startsWith("Name:"))?.replace("Name:", "").trim() || "",
    desc: parts.find((p) => p.startsWith("Desc:"))?.replace("Desc:", "").trim() || "",
  };
};

const WebSocketComponent = () => {
  const [params, setParams] = useState("No SocketServer Event");

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe("/topic/websocketmessage", (message) => {
          setParams(message.body);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error:", frame.headers["message"], frame.body);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const handleClick = useCallback(async () => {
    try {
      const response = await fetch(TRIGGER_URL, { method: "GET" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      console.log("WebSocket endpoint hit successfully");
    } catch (error) {
      console.error("Error hitting WebSocket endpoint:", error);
    }
  }, []);

  const { time, name, desc } = parseParams(params);

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <div
        style={{
          marginLeft: "50px",
          minHeight: "28.5px",
          display: "inline-block",
          border: "1px solid #336791",
          borderRadius: "4px",
          padding: "4px 8px",
          backgroundColor: "#FFFFFF",
          width: "900px",
          fontFamily: "Segoe UI",
          color: "#336791",
          whiteSpace: "normal",        // allows text to wrap to a new line
          overflowWrap: "break-word",  // breaks long words if necessary
          boxSizing: "border-box",     // includes padding in width calc
        }}
      >

        WebSocket:
        <span
          style={{
            fontFamily: "Segoe UI",
            fontSize: "12pt",
            color: "#D5441C",
            fontStyle: "italic",
            marginLeft: "4px",
          }}
        >
          (Event @ {time}) <strong>{name}:</strong> {desc}
        </span>
      </div>
      <div>&nbsp;</div>
    </div>
  );
};

export default WebSocketComponent;
