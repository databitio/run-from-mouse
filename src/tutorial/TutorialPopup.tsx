import { useState } from "react";
import { FaTimes, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import ControlsSlide from "./ControlsSlide";
import EatTheCheeseSlide from "./EatTheCheeseSlide";
import IntroSlide from "./IntroSlide";
import MouseSniffingSlide from "./MouseSniffingSlide";
import LastCheeseStanding from "./LastCheeseStanding";
import WinConditionSlide from "./WinConditionSlide";
import DrawSlide from "./DrawSlide";
import "./Tutorial.css";

const TutorialPopup = () => {
  const [tutorialVisible, setTutorialVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    <IntroSlide />,
    <ControlsSlide />,
    <DrawSlide />,
    <EatTheCheeseSlide />,
    <MouseSniffingSlide />,
    <LastCheeseStanding />,
    <WinConditionSlide />,
  ];

  if (tutorialVisible)
    return (
      <main className="absolute w-[400px] h-[400px] z-30 bg-neutral-200 shadow-sm shadow-black/20 rounded-md">
        <section className="absolute m-3">
          <FaTimes
            onClick={() => setTutorialVisible(false)}
            className="text-slate-700 w-[20px] h-[20px] cursor-pointer"
          />
        </section>
        <section className="w-full top-[50%] absolute flex flex-row justify-between items-center">
          <FaCaretLeft
            className="h-[25px] w-[25px] m-2 cursor-pointer"
            onClick={() => {
              if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
            }}
          />
          <FaCaretRight
            className="h-[25px] w-[25px] m-2 cursor-pointer"
            onClick={() => {
              if (currentSlide < slides.length - 1)
                setCurrentSlide(currentSlide + 1);
            }}
          />
        </section>
        <section className="absolute bottom-0 mb-4 flex flex-row w-full justify-center text-center pointer-events-none">
          {slides.map((_, index) => (
            <div key={index}>
              {currentSlide === index ? (
                <div className="w-[4px] h-[4px] bg-slate-400 mx-1 rounded-full" />
              ) : (
                <div className="w-[4px] h-[4px] bg-slate-600 mx-1 rounded-full" />
              )}
            </div>
          ))}
        </section>
        {slides[currentSlide]}
      </main>
    );
  return <></>;
};

export default TutorialPopup;
