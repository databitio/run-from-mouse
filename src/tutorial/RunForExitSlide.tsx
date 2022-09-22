const RunForExitSlide = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center p-12 text-slate-800">
      <h1 className="text-2xl font-bold">Run for exit</h1>
      <p className="my-1 text-center">
        Once all cheese is gone, Mouse will chase you until he eats you or until
        you get through a hole in the wall.
      </p>
      <img src={require("../assets/mouse-found-you.png")} className="w-full" />
    </section>
  );
};

export default RunForExitSlide;
