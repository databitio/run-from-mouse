const MouseSniffingSlide = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center p-12 text-slate-800">
      <h1 className="text-2xl font-bold">Mouse sniffs for cheese</h1>
      <p className="my-2 text-center">
        Don't get detected by Mouse when he's sniffing for cheese.
      </p>
      <img src={require("../assets/mouse-sniffing.png")} className="w-full" />
    </section>
  );
};

export default MouseSniffingSlide;
