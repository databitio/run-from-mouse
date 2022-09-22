const EatTheCheeseSlide = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-12 text-slate-800">
      <h1 className="text-4xl font-bold">Eat the cheese</h1>
      <p className="my-2 text-center">
        Eat cheese before Mouse does to prevent him from getting faster and
        stronger.
      </p>
      <div className="flex flex-row items-center h-full bg-slate-300">
        <img
          src={require("../assets/mouse-icon.png")}
          className="w-[100px] h-[100px] object-contain rounded-full"
        />
        <div className="font-bold text-3xl flex items-center">{`- - - ->`}</div>
        <img
          src={require("../assets/cheese-icon.jpeg")}
          className="w-[100px] h-[100px] object-contain rounded-full"
        />
      </div>
    </section>
  );
};

export default EatTheCheeseSlide;
