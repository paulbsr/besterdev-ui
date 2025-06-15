import { TbBrandSocketIo } from "react-icons/tb";

function WebSocketTrigger() {

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

  return (
    <td className='Font-Verdana-Small-Postgres' onClick={handleClick}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <TbBrandSocketIo title="Last WebSocket Event" style={{ color: '#4D4D4D', fontSize: '23px', cursor: 'pointer' }} />  WebSocket:
    </td>
  );
}

export default WebSocketTrigger;
