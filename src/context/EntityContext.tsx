import { createContext, useEffect, useState } from "react";
import { BoardState, Consumable, Tile } from "./BoardContext";
import useBoard from "../hooks/useBoard";
import { delay } from "../board/Tile";

const isEntity = (object: any) => {
  return object instanceof Entity && Object.keys(object).length !== 0;
};
const isConsumable = (object: any) => {
  return object instanceof Consumable && Object.keys(object).length !== 0;
};

const MoveConditions = (
  board: BoardState,
  entity: Entity,
  object: Entity | Consumable
) => {
  if (isConsumable(object)) entity.speed += 1;
  if (isEntity(object) && object.name === "cheese") board.setGameOver(true);
  if (isConsumable(object) && entity.name === "cheese")
    board.setChargeLeft(board.chargeLeft + 5);
  if (isEntity(object) && object.name === "mouse") {
    board.setGameOver(true);
    return true;
  }
  return false;
};

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
      if (MoveConditions(board, this, next_tile.occupied)) {
        return;
      }

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
      if (MoveConditions(board, this, next_tile.occupied)) {
        return;
      }

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
      if (MoveConditions(board, this, next_tile.occupied)) {
        return;
      }

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
      if (MoveConditions(board, this, next_tile.occupied)) {
        return;
      }

      this_tile.occupied = {} as Entity;
      this.y += 1;
      next_tile.occupied = this;
      next_tile.highlighted = false;
      board.setTiles([...board.tiles]);
    }
  };
}

export interface EntityContext {
  mouse: Entity;
  setMouse: (mouse: Entity) => void;
  cheese: Entity;
  setCheese: (cheese: Entity) => void;
}

const EntityContext = createContext<EntityContext>({} as EntityContext);

export const EntityProvider = (props: any) => {
  const { children } = props;
  const board = useBoard();
  const corner = board.numberOfTiles - 1;

  const [mouse, setMouse] = useState(new Entity("mouse", 0, 0));
  const [cheese, setCheese] = useState(new Entity("cheese", corner, corner));

  useEffect(() => {
    board.tiles[0][0].occupied = mouse;
    board.tiles[corner][corner].occupied = cheese;
    board.setTiles([...board.tiles]);
  }, [mouse]);

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
