import { useState } from "react";
import useBoard from "../hooks/useBoard";
import "./Tile.css";

//in milliseconds; 5000 is 5 seconds
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const Tile = (props: { x: number; y: number; tileSize: number }) => {
  const { x, y, tileSize } = props;
  const board = useBoard();
  const tile = board.tiles[x][y];

  const DegradeTile = async (time: number) => {
    await delay(time);
    board.tiles[x][y].active = false;
    board.setTiles([...board.tiles]);
  };

  const ActivateTile = async () => {
    if (!tile.blocked && !tile.active) {
      board.tiles[x][y].active = true;
      board.setTiles([...board.tiles]);
    }
  };

  return (
    <div
      className={
        tile.active
          ? "border-[1px] border-neutral-300 bg-neutral-500 transition-colors cursor-pointer"
          : tile.blocked
          ? "border-[1px] border-neutral-300 bg-neutral-900 transition-colors cursor-pointer"
          : "border-[1px] border-neutral-300 bg-neutral-200 degrade-color cursor-pointer"
      }
      draggable={true}
      onDragLeave={() => DegradeTile(3000)}
      onDragEnter={() => ActivateTile()}
      style={{ width: tileSize, height: tileSize }}
    />
  );
};

export default Tile;
