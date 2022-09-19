import TileComponent from "./Tile";
import useBoard from "../hooks/useBoard";
import useEntities from "../hooks/useEntities";
import TestMoveButtons from "./TestMoveButtons";
import { useEffect } from "react";
import { delay } from "../context/BoardContext";

const Board = () => {
  const board = useBoard();
  const entities = useEntities();
  const continueRight = async () => {
    await delay(3000 / entities.mouse.speed);
    entities.mouse.MoveRight(board);
    continueRight();
  };

  document.onkeydown = checkKey;

  function checkKey(e: any) {
    e = e || window.event;

    if (e.keyCode == "38") {
      entities.mouse.MoveUp(board);
    } else if (e.keyCode == "40") {
      entities.mouse.MoveDown(board);
    } else if (e.keyCode == "37") {
      entities.mouse.MoveLeft(board);
    } else if (e.keyCode == "39") {
      entities.mouse.MoveRight(board);
    }
  }

  return (
    <div>
      <section className="bg-neutral-500 relative flex flex-col border-4 border-black">
        {board.tiles.map((rows, rowindex) => (
          <div key={rowindex} className="flex flex-row">
            {rows.map((tile, colindex) => (
              <div key={colindex + rowindex}>
                <TileComponent
                  tile={tile}
                  x={rowindex}
                  y={colindex}
                  tileSize={board.tileSize}
                />
              </div>
            ))}
          </div>
        ))}
      </section>
      <TestMoveButtons />
    </div>
  );
};

export default Board;
// <canvas style={{ width: 2000, height: 2000, color: "white" }}></canvas>
