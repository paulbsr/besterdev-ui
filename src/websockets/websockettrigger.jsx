
import { useState } from "react";
import { TbBrandSocketIo } from "react-icons/tb";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

function WebSocketTrigger() {
  const [loading, setLoading] = useState(false);

  // const handleClick = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await OAuth2APIClient.get(
  //       `${process.env.NEXT_PUBLIC_API_URL || "https://besterdev-api-13a0246c9cf2.herokuapp.com"}/api/v1/triggerwebsocketevent`,
  //       { method: "GET" }
  //     );

  //     if (!response.ok) {throw new Error(`HTTP error: ${response.status}`);}

  //     console.log("WebSocket Endpoint hit successfully");
  //   } catch (error) {
  //     console.error("Error hitting WebSocket endpoint:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await OAuth2APIClient.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/triggerwebsocketevent`);
console.log("Full response:", response);
      console.log("WebSocket Endpoint hit successfully", response.data);
      console.log("Full response:", response);
    } catch (error) {
      console.error(
        "Error hitting WebSocket endpoint:",
        error.response?.status,
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <td className="Font-Verdana-Small-Postgres">
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#4D4D4D",
          fontSize: "14px"
        }}
        title="Trigger WebSocket Event"
      >
        <TbBrandSocketIo style={{ fontSize: "23px" }} />
        {loading ? "Loading..." : "WebSocket"}
      </button>
    </td>
  );
}

export default WebSocketTrigger;
