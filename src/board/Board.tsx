import Tile from "./Tile";
import Entity from "./Entity";
import useBoard from "../hooks/useBoard";
import { useState } from "react";
import TestMoveButtons from "./TestMoveButtons";

const Board = () => {
  const board = useBoard();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  return (
    <div>
      <section className="bg-neutral-500 relative flex flex-col border-4 border-black">
        <Entity tileSize={board.tileSize} x={mouseX} y={mouseY} />
        {board.tiles.map((rows, rowindex) => (
          <div key={rowindex} className="flex flex-row">
            {rows.map((_, colindex) => (
              <div key={colindex + rowindex}>
                <Tile x={rowindex} y={colindex} tileSize={board.tileSize} />
              </div>
            ))}
          </div>
        ))}
      </section>
      <TestMoveButtons
        x={mouseX}
        y={mouseY}
        setX={setMouseX}
        setY={setMouseY}
      />
    </div>
  );
};

export default Board;
// <canvas style={{ width: 2000, height: 2000, color: "white" }}></canvas>
