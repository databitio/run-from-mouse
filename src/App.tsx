import "./App.css";
import Board from "./board/Board";
import TutorialPopup from "./tutorial/TutorialPopup";
import NavBar from "./navbar/NavBar";

function App() {
  return (
    <main
      className="h-screen w-screen max-w-[100vw] flex flex-row items-center justify-center bg-slate-400 overflow-x-hidden"
      id="main-component"
    >
      <NavBar />
      <TutorialPopup />
      <Board />
    </main>
  );
}

export default App;
