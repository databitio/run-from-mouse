import {
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaCaretUp,
} from "react-icons/fa";

const ControlsSlide = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-12 text-slate-800">
      <h1 className="text-4xl font-bold">Move keys</h1>
      <p className="my-2 text-center">Move your cheese with the arrow keys.</p>
      <section className="h-full flex flex-col justify-center items-center">
        <div className="flex flex-row">
          <div></div>
          <div className="m-2 w-[50px] h-[50px] text-4xl font-bold rounded-md border-black border-4 flex items-center justify-center">
            <FaCaretUp className="h-[25px] w-[25px]" />
          </div>
          <div></div>
        </div>
        <div className="flex flex-row">
          <div className="m-2 w-[50px] h-[50px] text-4xl font-bold rounded-md border-black border-4 flex items-center justify-center">
            <FaCaretLeft className="h-[25px] w-[25px]" />
          </div>
          <div className="m-2 w-[50px] h-[50px] text-4xl font-bold rounded-md border-black border-4 flex items-center justify-center">
            <FaCaretDown className="h-[25px] w-[25px]" />
          </div>
          <div className="m-2 w-[50px] h-[50px] text-4xl font-bold rounded-md border-black border-4 flex items-center justify-center">
            <FaCaretRight className="h-[25px] w-[25px]" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ControlsSlide;
