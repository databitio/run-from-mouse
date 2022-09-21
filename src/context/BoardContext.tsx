import { createContext, useState } from "react";
import { Entity } from "./EntityContext";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export class Consumable {
  name: string;
  x: number;
  y: number;
  speed: number;
  duration: number;
  constructor(
    name: string,
    x: number,
    y: number,
    speed: number,
    duration: number
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.duration = duration;
  }
}

export interface Tile {
  active: boolean;
  blocked: boolean;
  occupied: Entity | Consumable;
  sniffed: boolean;
  highlighted: boolean;
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
          sniffed: false,
          highlighted: false,
          occupied: {} as Entity | Consumable,
          nextMove: () => {},
          x: i,
          y: j,
        };
        if (i === Math.floor(Math.random() * numberOfTiles))
          new_tile.blocked = true;
        if (
          i === Math.floor(Math.random() * numberOfTiles) &&
          !new_tile.blocked
        ) {
          new_tile.occupied = new Consumable("cheese", i, j, 2, 30000);
        }
        new_tiles[i].push(new_tile);
      }
    }
    return new_tiles;
  };

  const [numberOfTiles, setNumberOfTiles] = useState(10);
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
