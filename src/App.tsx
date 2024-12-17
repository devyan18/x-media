// import { invoke } from "@tauri-apps/api/core";
// async function greet() {
// // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//   setGreetMsg(await invoke("greet", { name }));
// }
import { useEffect } from "react";
import "./App.css";

import io from "socket.io-client";

const ws = io("http://localhost:4000");

function App() {
  useEffect(() => {
    ws.emit("connection");

    return () => {
      ws.disconnect();
    };
  }, []);

  return (
    <main className="container">
      <h1 className="text-3xl font-medium">X-Media</h1>
    </main>
  );
}

export default App;
