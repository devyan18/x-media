// import { invoke } from "@tauri-apps/api/core";
// async function greet() {
// // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//   setGreetMsg(await invoke("greet", { name }));
// }
import "./App.css";
import AudioStreamer from "./components/AudioStreamer";

function App() {
  return (
    <main className="container">
      <h1 className="text-3xl font-medium">X-Media</h1>
      <AudioStreamer />
    </main>
  );
}

export default App;
