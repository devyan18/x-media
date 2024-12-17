// src/components/AudioStreamer.tsx
import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const AudioStreamer: React.FC = () => {
  const socket = useRef<Socket | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Inicializar conexión Socket.IO
    socket.current = io("http://localhost:4000");

    // Función para capturar y enviar audio
    const startAudioStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext.current = new AudioContext();
        const source = audioContext.current.createMediaStreamSource(stream);
        const processor = audioContext.current.createScriptProcessor(
          1024,
          1,
          1,
        );

        // Conectar audio al procesador
        source.connect(processor);
        processor.connect(audioContext.current.destination);

        // Capturar y enviar audio
        processor.onaudioprocess = (event) => {
          const inputData = event.inputBuffer.getChannelData(0);
          const audioArray = Array.from(inputData); // Convertir a array
          socket.current?.emit("audio", audioArray);
        };
      } catch (error) {
        console.error("Error capturando audio:", error);
      }
    };

    startAudioStream();

    // Recibir audio y reproducirlo
    socket.current.on("audio", (audioData: number[]) => {
      if (!audioContext.current) return;

      const buffer = audioContext.current.createBuffer(
        1,
        audioData.length,
        audioContext.current.sampleRate,
      );
      buffer.copyToChannel(new Float32Array(audioData), 0);

      const source = audioContext.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.current.destination);
      source.start();
    });

    // Cleanup
    return () => {
      socket.current?.disconnect();
      audioContext.current?.close();
    };
  }, []);

  return <h2>Transmisión de Audio</h2>;
};

export default AudioStreamer;
