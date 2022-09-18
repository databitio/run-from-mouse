import { createContext, useEffect, useState } from "react";
import { Entity } from "../board/Entity";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface Tile {
  active: boolean;
  blocked: boolean;
  occupied: Entity;
  x: number;
  y: number;
}

export interface BoardState {
  numberOfTiles: number;
  setNumberOfTiles: (numberOfTiles: number) => void;
  tiles: Tile[][];
  setTiles: (tiles: Tile[][]) => void;
  tileSize: number;
  setTileSize: (tileSize: number) => void;
  chargeLeft: number;
  setChargeLeft: (chargeLeft: number) => void;
}

const BoardContext = createContext<BoardState>({} as BoardState);

export const BoardProvider = (props: any) => {
  const { children } = props;

  const createTiles = () => {
    const new_tiles: Tile[][] = [];
    for (let i = 0; i < numberOfTiles; i++) {
      new_tiles.push([]);
      for (let j = 0; j < numberOfTiles; j++) {
        const new_tile = {
          active: false,
          blocked: false,
          occupied: {} as Entity,
          x: i,
          y: j,
        };
        if (i === Math.floor(Math.random() * numberOfTiles))
          new_tile.blocked = true;
        new_tiles[i].push(new_tile);
      }
    }
    return new_tiles;
  };

  const [numberOfTiles, setNumberOfTiles] = useState(20);
  const [tiles, setTiles] = useState<Tile[][]>(createTiles());
  const [tileSize, setTileSize] = useState(30);
  const [chargeLeft, setChargeLeft] = useState(100);

  const board: BoardState = {
    numberOfTiles: numberOfTiles,
    setNumberOfTiles: setNumberOfTiles,
    tiles: tiles,
    setTiles: setTiles,
    tileSize: tileSize,
    setTileSize: setTileSize,
    chargeLeft: chargeLeft,
    setChargeLeft: setChargeLeft,
  };

  return (
    <BoardContext.Provider value={board}>{children}</BoardContext.Provider>
  );
};

export default BoardContext;
