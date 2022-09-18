import { createContext, useState } from "react";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface Tile {
  active: boolean;
  blocked: boolean;
  occupied: boolean;
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
  //   Entities: Entity[];
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
          occupied: false,
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

  return (
    <BoardContext.Provider
      value={{
        numberOfTiles,
        setNumberOfTiles,
        tiles,
        setTiles,
        tileSize,
        setTileSize,
        chargeLeft,
        setChargeLeft,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;