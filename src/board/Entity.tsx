import { BoardState } from "../context/BoardContext";
import Cheese from "./Cheese";

const EntityComponent = (props: { tileSize: number; name: string }) => {
  const { tileSize, name } = props;
  const size = Math.floor((tileSize * 2) / 3);

  if (name === "cheese") return <Cheese size={tileSize} fake={true} />;
  return (
    // <div
    //   className="bg-neutral-700 rounded-2xl"
    //   style={{
    //     width: size,
    //     height: size,
    //   }}
    // ></div>
    <img
      className={"rounded-full object-contain"}
      src={require("../assets/mouse-icon.png")}
      style={{ width: size * 2, height: size * 2 }}
    />
  );
};

export default EntityComponent;
