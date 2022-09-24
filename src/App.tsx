import "./App.css";
import Board from "./board/Board";
import TutorialPopup from "./tutorial/TutorialPopup";
import NavBar from "./navbar/NavBar";
import { useState } from "react";

function App() {
  const [start, setStart] = useState(true);
  return (
    <main
      className="min-h-[100vh] min-w-[100vw] flex flex-row items-center justify-center bg-slate-400"
      id="main-component"
    >
      <NavBar start={start} setStart={setStart} />
      <TutorialPopup />
      <Board start={start} setStart={setStart} />
    </main>
  );
}

export default App;
