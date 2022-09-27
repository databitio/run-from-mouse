import { createContext, useState } from "react";
import { isCheeseLeft } from "../search_for_cheese/SniffForCheese";
import { Entity } from "./EntityContext";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export class Consumable {
  name: string;
  x: number;
  y: number;
  speed: number;
  constructor(name: string, x: number, y: number, speed: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
}

export interface Tile {
  active: boolean;
  blocked: boolean;
  occupied: Entity | Consumable;
  sniffed: boolean;
  highlighted: boolean;
  exit: boolean;
  x: number;
  y: number;
  nextMove: (board: BoardState) => void;
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
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
  win: boolean;
  setWin: (win: boolean) => void;
}

const BoardContext = createContext<BoardState>({} as BoardState);

export const BoardProvider = (props: any) => {
  const { children } = props;

  const [numberOfTiles, setNumberOfTiles] = useState(7);
  const [tiles, setTiles] = useState<Tile[][]>(createTiles(numberOfTiles));
  const [tileSize, setTileSize] = useState(60);
  const [chargeLeft, setChargeLeft] = useState(20);
  const [gameOver, setGameOver] = useState(true);
  const [win, setWin] = useState(false);

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
    win: win,
    setWin: setWin,
  };

  return (
    <BoardContext.Provider value={board}>{children}</BoardContext.Provider>
  );
};

export default BoardContext;

export const createTiles = (numberOfTiles: number) => {
  const new_tiles: Tile[][] = [];
  for (let i = 0; i < numberOfTiles; i++) {
    new_tiles.push([]);
    for (let j = 0; j < numberOfTiles; j++) {
      const new_tile = {
        active: false,
        blocked: false,
        sniffed: false,
        highlighted: false,
        occupied: {} as Entity | Consumable,
        exit: false,
        nextMove: () => {},
        x: i,
        y: j,
      };
      if (
        i === Math.floor(Math.random() * numberOfTiles) &&
        i !== 0 &&
        j !== 0 &&
        i !== numberOfTiles - 1 &&
        j !== numberOfTiles - 1
      )
        new_tile.blocked = true;
      if (
        i === Math.floor(Math.random() * numberOfTiles) &&
        !new_tile.blocked
      ) {
        new_tile.occupied = new Consumable("cheese", i, j, 2);
      }
      // if (new_tile)
      new_tiles[i].push(new_tile);
    }
  }
  return new_tiles;
};
