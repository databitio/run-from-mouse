const IntroSlide = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center p-12 text-slate-800">
      <h1 className="text-4xl font-bold">Run From Mouse</h1>
      <p className="my-2 text-center">
        You are a piece of cheese and you need to Run From Mouse.
      </p>
      <img
        src={require("../assets/run-from-mouse-intro.png")}
        className="w-full"
      />
    </section>
  );
};

export default IntroSlide;
