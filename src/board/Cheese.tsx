const Cheese = (props: { size: number; fake: boolean }) => {
  const { size, fake } = props;
  return (
    <img
      className={fake ? "opacity-60 rounded-full" : "rounded-full"}
      src={require("../assets/cheese-icon.jpeg")}
      style={{ width: size, height: size }}
    />
  );
};

export default Cheese;
