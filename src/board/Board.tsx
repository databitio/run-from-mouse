import TileComponent from "./Tile";
import useBoard from "../hooks/useBoard";
import useEntities from "../hooks/useEntities";
import { useEffect } from "react";

const Board = () => {
  const board = useBoard();
  const entities = useEntities();

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

  // const loopSniff = async () => {
  //   let found = true;
  //   while (found) {
  //     found = await sniffRange(
  //       board,
  //       entities.cheese,
  //       board.tiles[entities.cheese.x][entities.cheese.y],
  //       20
  //     );
  //   }
  // };

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
      {/* <button
        className="w-[200px] h-[50px] bg-green-500"
        onClick={() => {
          sniffRange(
            board,
            entities.cheese,
            board.tiles[entities.cheese.x][entities.cheese.y],
            20
          );
        }}
      >
        Sniff
      </button> */}
    </div>
  );
};

export default Board;
// <canvas style={{ width: 2000, height: 2000, color: "white" }}></canvas>
