import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DutchLanguage_GlobalRightClick() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");

  const API_URL =
    "https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dutchlanguagewoordenschat/create";

  useEffect(() => {
    const handleContextMenu = (e) => {
      const text = window.getSelection().toString().trim();

      if (!text) return; // only show if text is selected

      e.preventDefault(); // block browser menu
      setSelectedText(text);
      setMenuPos({ x: e.pageX, y: e.pageY });
      setMenuVisible(true);
    };

    const closeMenu = () => setMenuVisible(false);

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  const sendToAPI = async () => {
    try {
      await axios.post(API_URL, {
        dutch: selectedText,
        afrikaans: selectedText,
        sample: ""
      });

      alert(`Saved "${selectedText}" to woordenschat`);
    } catch (err) {
      console.error(err);
      alert("Error sending POST");
    }
  };

  if (!menuVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: menuPos.y,
        left: menuPos.x,
        background: "white",
        border: "1px solid #ccc",
        padding: "8px 12px",
        borderRadius: "6px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
        zIndex: 99999,
        cursor: "pointer",
      }}
      onClick={sendToAPI}
    >
      ➜ Add “{selectedText}” to Woordenschat
    </div>
  );
}
