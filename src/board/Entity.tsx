import { BoardState } from "../context/BoardContext";

const EntityComponent = (props: { tileSize: number }) => {
  const { tileSize } = props;
  const size = Math.floor((tileSize * 2) / 3);

  return (
    <div
      className="bg-neutral-700 rounded-2xl"
      style={{
        width: size,
        height: size,
      }}
    ></div>
  );
};

export default EntityComponent;
