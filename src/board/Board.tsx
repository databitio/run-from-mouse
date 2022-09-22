import TileComponent from "./Tile";
import useBoard from "../hooks/useBoard";
import useEntities from "../hooks/useEntities";
import { sniffRange } from "../search_for_cheese/SniffRadius";
import { Entity, EntityContext } from "../context/EntityContext";
import { BoardState } from "../context/BoardContext";
import { useEffect } from "react";

const SetMoveKeys = (board: BoardState, entities: EntityContext) => {
  if (board.gameOver) return;

  document.onkeydown = checkKey;

  function checkKey(e: any) {
    e = e || window.event;

    if (e.keyCode == "38") {
      entities.cheese.MoveUp(board);
    } else if (e.keyCode == "40") {
      entities.cheese.MoveDown(board);
    } else if (e.keyCode == "37") {
      entities.cheese.MoveLeft(board);
    } else if (e.keyCode == "39") {
      entities.cheese.MoveRight(board);
    }
  }
};

const loopSniff = async (board: BoardState, mouse: Entity) => {
  let found = true;
  while (found) {
    found = await sniffRange(board, mouse);
  }
};

const Board = () => {
  const board = useBoard();
  const entities = useEntities();

  SetMoveKeys(board, entities);

  return (
    <div>
      <div>Charge left: {board.chargeLeft}</div>
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
      <button
        className="w-[200px] h-[50px] bg-green-500 text-white rounded-md m-2 shadow-md shadow-black/20"
        onClick={() => {
          loopSniff(board, entities.mouse);
          board.setGameOver(false);
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Board;
