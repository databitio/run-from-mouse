import { useState } from "react";
import { FaTimes, FaCaretLeft, FaCaretRight } from "react-icons/fa";

const TutorialPopup = () => {
  const [tutorialVisible, setTutorialVisible] = useState(true);

  if (tutorialVisible)
    return (
      <main className="absolute w-[400px] h-[400px] z-30 bg-neutral-200 shadow-sm shadow-black/20">
        <section className="absolute m-3">
          <FaTimes
            onClick={() => setTutorialVisible(false)}
            className="text-slate-700 w-[20px] h-[20px] cursor-pointer"
          />
        </section>
        <section className="w-full top-[50%] absolute flex flex-row justify-between items-center">
          <FaCaretLeft className="h-[25px] w-[25px] m-2 cursor-pointer" />
          <FaCaretRight className="h-[25px] w-[25px] m-2 cursor-pointer" />
        </section>
        <section className="absolute bottom-0 mb-4 flex flex-row w-full justify-center text-center pointer-events-none">
          <div className="w-[4px] h-[4px] bg-slate-600 mx-1 rounded-full"></div>
          <div className="w-[4px] h-[4px] bg-slate-400 mx-1 rounded-full"></div>
          <div className="w-[4px] h-[4px] bg-slate-600 mx-1 rounded-full"></div>
          <div className="w-[4px] h-[4px] bg-slate-600 mx-1 rounded-full"></div>
        </section>
        <section className="w-full flex flex-col justify-center items-center p-12 text-slate-800">
          <h1 className="text-4xl font-bold">Run From Mouse</h1>
          <p className="my-2">
            You are a piece of cheese and you need to Run From Mouse.
          </p>
          <img
            src={require("../assets/run-from-mouse-intro.png")}
            className="w-full"
          />
        </section>
      </main>
    );
  return <></>;
};

export default TutorialPopup;
