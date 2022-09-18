import { useState } from "react";
import { BoardState } from "../context/BoardContext";
import useBoard from "../hooks/useBoard";

export const MoveLeft = (
  board: BoardState,
  x: number,
  y: number,
  setPositionX: (position: number) => void
) => {
  const next_tile = board.tiles[y][x - 1];
  if (x > 0 && !next_tile.blocked && !next_tile.active) {
    setPositionX(x - 1);
  }
};
export const MoveRight = (
  board: BoardState,
  x: number,
  y: number,
  setPositionX: (position: number) => void
) => {
  const next_tile = board.tiles[y][x + 1];
  if (x < board.numberOfTiles - 1 && !next_tile.blocked && !next_tile.active) {
    setPositionX(x + 1);
  }
};
export const MoveUp = (
  board: BoardState,
  x: number,
  y: number,
  setPositionY: (position: number) => void
) => {
  const next_tile = board.tiles[y - 1][x];
  if (y > 0 && !next_tile.blocked && !next_tile.active) {
    setPositionY(y - 1);
  }
};
export const MoveDown = (
  board: BoardState,
  x: number,
  y: number,
  setPositionY: (position: number) => void
) => {
  const next_tile = board.tiles[y + 1][x];
  if (y < board.numberOfTiles - 1 && !next_tile.blocked && !next_tile.active) {
    setPositionY(y + 1);
  }
};

const Entity = (props: { tileSize: number; x: number; y: number }) => {
  const { tileSize, x, y } = props;
  const size = Math.floor((tileSize * 2) / 3);

  return (
    <div
      className="flex items-center justify-center absolute"
      style={{
        width: tileSize,
        height: tileSize,
        left: x * tileSize,
        top: y * tileSize,
      }}
    >
      <div
        className="bg-neutral-700 rounded-2xl"
        style={{
          width: size,
          height: size,
        }}
      ></div>
    </div>
  );
};

export default Entity;
