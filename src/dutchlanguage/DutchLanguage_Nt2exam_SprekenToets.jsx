import { useState, useRef } from "react";
import express from "express";
import fileUpload from "express-fileupload";
import OpenAI from "openai";

export default function DutchLanguage_Nt2exam_SprekenToets() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      chunks.current = [];
      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      await fetch("/api/transcribe", { method: "POST", body: formData });
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}>🎙️ Start Recording Audio</button>
      ) : (
        <button onClick={stopRecording}>⏹ Stop Recording Audio</button>
      )}
    </div>
  );


  
}
