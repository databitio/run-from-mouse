import TileComponent from "./Tile";
import useBoard from "../hooks/useBoard";
import useEntities from "../hooks/useEntities";
import { sniffRange } from "../search_for_cheese/SniffForCheese";
import { Entity } from "../context/EntityContext";
import { BoardState } from "../context/BoardContext";

export const SetMoveKeys = (board: BoardState, entity: Entity) => {
  document.onkeydown = checkKey;

  function checkKey(e: any) {
    e = e || window.event;

    if (e.keyCode == "38") {
      if (board.gameOver) return;
      entity.MoveUp(board);
    } else if (e.keyCode == "40") {
      if (board.gameOver) return;
      entity.MoveDown(board);
    } else if (e.keyCode == "37") {
      if (board.gameOver) return;
      entity.MoveLeft(board);
    } else if (e.keyCode == "39") {
      if (board.gameOver) return;
      entity.MoveRight(board);
    }
  }
};

const loopSniff = async (board: BoardState, mouse: Entity) => {
  let found = true;
  while (found) {
    if (board.win || board.gameOver) {
      return;
    }
    found = await sniffRange(board, mouse);
  }
};

const Board = (props: {
  start: boolean;
  setStart: (start: boolean) => void;
}) => {
  const { start, setStart } = props;
  const board = useBoard();
  const entities = useEntities();

  SetMoveKeys(board, entities.cheese);

  return (
    <div className="h-full m-12 bg-slate-400">
      <div className="flex flex-col justify-between">
        {board.win ? (
          <div className="text-green-500 font-bold text-2xl text-center">
            You've escape!
          </div>
        ) : !start && board.gameOver ? (
          <div className="text-red-500 font-bold text-2xl text-center">
            Game Over
          </div>
        ) : (
          <></>
        )}
        <div className="max-w-[200px] min-w-[50px]">
          Charge left: {board.chargeLeft}
        </div>
      </div>
      <section className="bg-neutral-500 relative flex flex-col border-4 border-black">
        {board.tiles.map((rows, rowindex) => (
          <div key={rowindex} className="flex flex-row">
            {rows.map((tile, colindex) => (
              <div key={colindex + rowindex}>
                <TileComponent
                  tile={tile}
                  tileSize={board.tileSize}
                  board={board}
                />
              </div>
            ))}
          </div>
        ))}
      </section>
      {start ? (
        <button
          className="max-w-[200px] w-full min-w-[50px] h-[50px] bg-green-500 text-white rounded-md my-2 shadow-md shadow-black/20"
          onClick={() => {
            loopSniff(board, entities.mouse);
            board.setGameOver(false);
            setStart(false);
          }}
        >
          Start
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Board;
