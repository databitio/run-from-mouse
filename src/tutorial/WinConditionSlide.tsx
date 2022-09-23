const WinConditionSlide = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center p-12 text-slate-800">
      <h1 className="text-2xl font-bold">Run for exit</h1>
      <p className="my-1 text-center">
        Exits will open when all cheese is gone. Get to an exit before Mouse
        finds you to win!
      </p>
      <img src={require("../assets/mouse-found-you.png")} className="w-full" />
    </section>
  );
};

export default WinConditionSlide;
