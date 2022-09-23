import TileComponent from "../board/Tile";
import { useEffect, useState } from "react";
import { Tile, Consumable, createTiles } from "../context/BoardContext";
import { Entity } from "../context/EntityContext";
import { FaRegHandPointUp } from "react-icons/fa";
import { BoardState } from "../context/BoardContext";
import { SetMoveKeys } from "../board/Board";

const DrawSlide = () => {
  const demoCheese = new Entity("cheese", 2, 2);

  const [numberOfTiles, setNumberOfTiles] = useState(3);
  const [tiles, setTiles] = useState<Tile[][]>(createTiles(numberOfTiles));
  const [tileSize, setTileSize] = useState(60);
  const [chargeLeft, setChargeLeft] = useState(9999);
  const [gameOver, setGameOver] = useState(false);

  const board: BoardState = {
    numberOfTiles: numberOfTiles,
    setNumberOfTiles: setNumberOfTiles,
    tiles: tiles,
    setTiles: setTiles,
    tileSize: tileSize,
    setTileSize: setTileSize,
    chargeLeft: chargeLeft,
    setChargeLeft: setChargeLeft,
    gameOver: gameOver,
    setGameOver: setGameOver,
  };

  useEffect(() => {
    SetMoveKeys(board, demoCheese);
  }, []);

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-12 text-slate-800">
      <h1 className="text-2xl font-bold">Draw to block Mouse</h1>
      <div className="my-1 w-full text-center flex flex-col items-center h-full relative">
        <FaRegHandPointUp className="absolute right-0 w-[100px] h-[100px] top-[25%] pointer-events-none z-30 introDrawAnimation" />
        Click and drag to draw in front of mouse to stop him from finding you.
        <div className="m-8">
          {tiles?.map((row, rowindex) => (
            <div key={rowindex} className="flex flex-row">
              {row.map((tile, colindex) => (
                <div key={colindex}>
                  <TileComponent
                    tile={tile}
                    tileSize={tileSize}
                    board={board}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* <img src={require("../assets/mouse-found-you.png")} className="w-full" /> */}
    </section>
  );
};

export default DrawSlide;
