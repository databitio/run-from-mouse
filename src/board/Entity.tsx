import { useEffect, useState } from "react";
import { BoardState } from "../context/BoardContext";
import useBoard from "../hooks/useBoard";

export class Entity {
  name: string;
  x: number;
  y: number;
  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  MoveLeft = (board: BoardState) => {
    const this_tile = board.tiles[this.y][this.x];
    const next_tile = board.tiles[this.y][this.x - 1];
    if (this.x > 0 && !next_tile.blocked && !next_tile.active) {
      this_tile.occupied = {} as Entity;
      this.x -= 1;
      next_tile.occupied = this;
      board.setTiles([...board.tiles]);
    }
  };
  MoveRight = (board: BoardState) => {
    const this_tile = board.tiles[this.y][this.x];
    const next_tile = board.tiles[this.y][this.x + 1];
    if (
      this.x < board.numberOfTiles - 1 &&
      !next_tile.blocked &&
      !next_tile.active
    ) {
      this_tile.occupied = {} as Entity;
      this.x += 1;
      next_tile.occupied = this;
      board.setTiles([...board.tiles]);
    }
  };
  MoveUp = (board: BoardState) => {
    const this_tile = board.tiles[this.y][this.x];
    const next_tile = board.tiles[this.y - 1][this.x];
    if (this.y > 0 && !next_tile.blocked && !next_tile.active) {
      this_tile.occupied = {} as Entity;
      this.y -= 1;
      next_tile.occupied = this;
      board.setTiles([...board.tiles]);
    }
  };
  MoveDown = (board: BoardState) => {
    const this_tile = board.tiles[this.y][this.x];
    const next_tile = board.tiles[this.y + 1][this.x];
    if (
      this.y < board.numberOfTiles - 1 &&
      !next_tile.blocked &&
      !next_tile.active
    ) {
      this_tile.occupied = {} as Entity;
      this.y += 1;
      next_tile.occupied = this;
      board.setTiles([...board.tiles]);
    }
  };
}

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
