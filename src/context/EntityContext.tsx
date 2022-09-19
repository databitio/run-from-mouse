import { createContext, useEffect, useState } from "react";
import { BoardState, Consumable, Tile } from "./BoardContext";
import useBoard from "../hooks/useBoard";
import { delay } from "../board/Tile";

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
      board.setTiles([...board.tiles]);
    }
  };
}

export interface EntityContext {
  mouse: Entity;
  setMouse: (mouse: Entity) => void;
}

const EntityContext = createContext<EntityContext>({} as EntityContext);

export const EntityProvider = (props: any) => {
  const { children } = props;
  const [mouse, setMouse] = useState(new Entity("mouse", 0, 0));
  const board = useBoard();

  useEffect(() => {
    board.tiles[0][0].occupied = mouse;
    board.setTiles(board.tiles);
  }, []);

  const entities: EntityContext = {
    mouse: mouse,
    setMouse: setMouse,
  };

  return (
    <EntityContext.Provider value={entities}>{children}</EntityContext.Provider>
  );
};

export default EntityContext;
