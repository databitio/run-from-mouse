import "./App.css";
import Board from "./board/Board";
import TutorialPopup from "./tutorial/TutorialPopup";

function App() {
  return (
    <main
      className="h-screen w-screen min-w-[1000px] flex flex-row items-center justify-center bg-slate-400"
      id="main-component"
    >
      {/* <form className="text-4xl text-black z-30 h-[90%] mx-4 px-4 w-[300px] bg-slate-500 rounded-md absolute left-0">
        <label className="w-full">Options</label>
        <input className="w-full" placeholder="Mouse name" />
      </form>
      <div className="w-[300px]"></div> */}
      <TutorialPopup />
      <Board />
    </main>
  );
}

export default App;
