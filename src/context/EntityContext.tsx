import { createContext, useEffect, useState } from "react";
import { BoardState, Consumable, Tile } from "./BoardContext";
import useBoard from "../hooks/useBoard";
import { delay } from "../board/Tile";

export interface EntityContext {
  mouse: Mouse;
  setMouse: (mouse: Mouse) => void;
  cheese: Entity;
  setCheese: (cheese: Entity) => void;
}

const EntityContext = createContext<EntityContext>({} as EntityContext);

export const EntityProvider = (props: any) => {
  const { children } = props;
  const board = useBoard();
  const corner = board.numberOfTiles - 1;

  const [mouse, setMouse] = useState(new Mouse("mouse", 0, 0));
  const [cheese, setCheese] = useState(new Entity("cheese", corner, corner));

  useEffect(() => {
    board.tiles[0][0].occupied = mouse;
    board.tiles[corner][corner].occupied = cheese;
    board.setTiles(board.tiles);
  }, []);

  const entities: EntityContext = {
    mouse: mouse,
    setMouse: setMouse,
    cheese: cheese,
    setCheese: setCheese,
  };

  return (
    <EntityContext.Provider value={entities}>{children}</EntityContext.Provider>
  );
};

export default EntityContext;

export class Entity {
  name: string;
  x: number;
  y: number;
  speed: number;
  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.speed = 1;
  }

  MoveLeft = (board: BoardState) => {
    const this_tile = board.tiles[this.y][this.x];
    const next_tile = board.tiles[this.y][this.x - 1];
    if (this.x > 0 && !next_tile.blocked && !next_tile.active) {
      if (
        next_tile.occupied instanceof Consumable &&
        Object.keys(next_tile.occupied).length !== 0
      )
        this.speed += 1;
      this_tile.occupied = {} as Entity;
      this.x -= 1;
      next_tile.occupied = this;
      next_tile.highlighted = false;
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
      if (
        next_tile.occupied instanceof Consumable &&
        Object.keys(next_tile.occupied).length !== 0
      )
        this.speed += 1;
      this_tile.occupied = {} as Entity;
      this.x += 1;
      next_tile.occupied = this;
      next_tile.highlighted = false;
      board.setTiles([...board.tiles]);
    }
  };
  MoveUp = (board: BoardState) => {
    const this_tile = board.tiles[this.y][this.x];
    const next_tile = board.tiles[this.y - 1][this.x];
    if (this.y > 0 && !next_tile.blocked && !next_tile.active) {
      if (
        next_tile.occupied instanceof Consumable &&
        Object.keys(next_tile.occupied).length !== 0
      )
        this.speed += 1;
      this_tile.occupied = {} as Entity;
      this.y -= 1;
      next_tile.occupied = this;
      next_tile.highlighted = false;
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
      if (
        next_tile.occupied instanceof Consumable &&
        Object.keys(next_tile.occupied).length !== 0
      )
        this.speed += 1;
      this_tile.occupied = {} as Entity;
      this.y += 1;
      next_tile.occupied = this;
      next_tile.highlighted = false;
      board.setTiles([...board.tiles]);
    }
  };
}

const isActive = (tile: Tile) => {
  if (tile.sniffed || tile.active || tile.blocked) {
    return true;
  }
  return false;
};

const resetSniffedTiles = (board: BoardState) => {
  board.tiles.forEach((row) => {
    row.forEach((tile) => {
      tile.sniffed = false;
    });
  });
  board.setTiles([...board.tiles]);
  return;
};

export class Mouse extends Entity {
  sniffBoard = (board: BoardState, visited: Map<Tile, Tile>) => {
    const tiles = board.tiles;
    let found = {} as Tile;
    const MAX = visited.size;
    let iterator = 0;

    visited.forEach((child, parent) => {
      if (Object.keys(parent).length <= 0) {
        return;
      }

      if (iterator >= MAX) {
        return;
      }
      iterator++;

      const x = parent.x;
      const y = parent.y;

      if (x > 0 && !isActive(tiles[y][x - 1])) {
        tiles[y][x - 1].sniffed = true;
        tiles[y][x - 1].nextMove = this.MoveLeft;
        visited.set(tiles[x - 1][y], tiles[x][y]);
        if (Object.keys(tiles[y][x - 1].occupied).length > 0) {
          found = tiles[x - 1][y];
        }
      }
      if (x < board.numberOfTiles - 1 && !isActive(tiles[y][x + 1])) {
        tiles[y][x + 1].sniffed = true;
        tiles[y][x + 1].nextMove = this.MoveRight;
        visited.set(tiles[x + 1][y], tiles[x][y]);
        if (Object.keys(tiles[y][x + 1].occupied).length > 0) {
          found = tiles[x + 1][y];
        }
      }
      if (y > 0 && !isActive(tiles[y - 1][x])) {
        tiles[y - 1][x].sniffed = true;
        tiles[y - 1][x].nextMove = this.MoveUp;
        visited.set(tiles[x][y - 1], tiles[x][y]);
        if (Object.keys(tiles[y - 1][x].occupied).length > 0) {
          found = tiles[x][y - 1];
        }
      }
      if (y < board.numberOfTiles - 1 && !isActive(tiles[y + 1][x])) {
        tiles[y + 1][x].sniffed = true;
        tiles[y + 1][x].nextMove = this.MoveDown;
        visited.set(tiles[x][y + 1], tiles[x][y]);
        if (Object.keys(tiles[y + 1][x].occupied).length > 0) {
          found = tiles[x][y + 1];
        }
      }
    });

    board.setTiles([...tiles]);
    return found;
  };

  sniffRange = async (board: BoardState, startTile: Tile, radius: number) => {
    const x = startTile.x;
    const y = startTile.y;
    const speed = 1000 / this.speed;
    //child and parent; start node has no parent
    const visited = new Map<Tile, Tile>();
    visited.set(startTile, {} as Tile);
    board.tiles[y][x].sniffed = true;

    for (let i = 0; i < radius; i++) {
      const found = this.sniffBoard(board, visited);
      await delay(speed);
      if (Object.keys(found).length > 0) {
        this.highlightTiles(board, visited, found, speed);
        await delay(speed);
        resetSniffedTiles(board);
        return true;
      }
    }
    resetSniffedTiles(board);
    return false;
  };

  highlightTiles = async (
    board: BoardState,
    tiles: Map<Tile, Tile>,
    endTile: Tile,
    speed: number
  ) => {
    const movesArray: ((board: BoardState) => void)[] = [];
    board.tiles[endTile.y][endTile.x].highlighted = true;
    movesArray.push(board.tiles[endTile.y][endTile.x].nextMove);
    let prevTile = endTile;
    while (true) {
      const tile = tiles.get(prevTile);
      if (tile === undefined || Object.keys(tile).length === 0) {
        break;
      }
      const nextTile = tiles.get(tile);
      if (nextTile === undefined || Object.keys(nextTile).length === 0) {
        break;
      }
      const x = prevTile.x;
      const y = prevTile.y;
      board.tiles[tile.y][tile.x].highlighted = true;
      movesArray.push(board.tiles[tile.y][tile.x].nextMove);
      prevTile = tile;
    }
    for (let i = movesArray.length - 1; i >= 0; i--) {
      movesArray[i](board);
      await delay(speed);
    }
    board.setTiles([...board.tiles]);
  };
}
