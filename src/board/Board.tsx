import Tile from "./Tile";
import Mouse from "./Mouse";

const Board = () => {
  const arr = Array(30).fill(0);

  return (
    <section className="w-[900px] h-[900px] bg-neutral-500 relative flex flex-col">
      <Mouse />
      {arr.map((x, rowindex) => (
        <div key={rowindex} className="flex flex-row">
          {arr.map((y, colindex) => (
            <div key={colindex + rowindex}>
              <Tile x={rowindex} y={colindex} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Board;
// <canvas style={{ width: 2000, height: 2000, color: "white" }}></canvas>
