import { ObjectFlags } from "typescript";
import { delay } from "../board/Tile";
import { BoardState } from "../context/BoardContext";
import { Tile } from "../context/BoardContext";
import { Entity } from "../context/EntityContext";
import { Consumable } from "../context/BoardContext";

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
      tile.highlighted = false;
    });
  });
  board.setTiles([...board.tiles]);
  return;
};

const highlightTiles = async (
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

    board.tiles[tile.y][tile.x].highlighted = true;
    movesArray.push(board.tiles[tile.y][tile.x].nextMove);
    prevTile = tile;
  }
  for (let i = movesArray.length - 1; i >= 0; i--) {
    movesArray[i](board);
    await delay(speed);
  }
  board.setTiles([...board.tiles]);
  return movesArray.length;
};

export const sniffRange = async (board: BoardState, mouse: Entity) => {
  const x = mouse.x;
  const y = mouse.y;
  const speed = 750 / mouse.speed;
  //child and parent; start node has no parent
  const visited = new Map<Tile, Tile>();
  visited.set(board.tiles[x][y], {} as Tile);
  board.tiles[y][x].sniffed = true;

  for (let i = 0; i < board.numberOfTiles * 5; i++) {
    const found = sniffBoard(board, mouse, visited);
    await delay(speed);
    if (Object.keys(found).length > 0) {
      await highlightTiles(board, visited, found, speed);
      resetSniffedTiles(board);
      await delay(1000);

      return true;
    }
  }
  resetSniffedTiles(board);
  return false;
};

//visited is a child, parent map; in this function, children are becoming parents to other tiles
export const sniffBoard = (
  board: BoardState,
  mouse: Entity,
  visited: Map<Tile, Tile>
) => {
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
      tiles[y][x - 1].nextMove = mouse.MoveLeft;
      visited.set(tiles[x - 1][y], tiles[x][y]);
      if (Object.keys(tiles[y][x - 1].occupied).length > 0) {
        found = tiles[x - 1][y];
        if (
          tiles[y][x - 1].occupied.name === "cheese" &&
          tiles[y][x - 1].occupied instanceof Entity
        ) {
          board.setGameOver(true);
        }
      }
    }
    if (x < board.numberOfTiles - 1 && !isActive(tiles[y][x + 1])) {
      tiles[y][x + 1].sniffed = true;
      tiles[y][x + 1].nextMove = mouse.MoveRight;
      visited.set(tiles[x + 1][y], tiles[x][y]);
      if (Object.keys(tiles[y][x + 1].occupied).length > 0) {
        found = tiles[x + 1][y];
        if (
          tiles[y][x + 1].occupied.name === "cheese" &&
          tiles[y][x + 1].occupied instanceof Entity
        ) {
          board.setGameOver(true);
        }
      }
    }
    if (y > 0 && !isActive(tiles[y - 1][x])) {
      tiles[y - 1][x].sniffed = true;
      tiles[y - 1][x].nextMove = mouse.MoveUp;
      visited.set(tiles[x][y - 1], tiles[x][y]);
      if (Object.keys(tiles[y - 1][x].occupied).length > 0) {
        found = tiles[x][y - 1];
        if (
          tiles[y - 1][x].occupied.name === "cheese" &&
          tiles[y - 1][x].occupied instanceof Entity
        ) {
          board.setGameOver(true);
        }
      }
    }
    if (y < board.numberOfTiles - 1 && !isActive(tiles[y + 1][x])) {
      tiles[y + 1][x].sniffed = true;
      tiles[y + 1][x].nextMove = mouse.MoveDown;
      visited.set(tiles[x][y + 1], tiles[x][y]);
      if (Object.keys(tiles[y + 1][x].occupied).length > 0) {
        found = tiles[x][y + 1];
        if (
          tiles[y + 1][x].occupied.name === "cheese" &&
          tiles[y + 1][x].occupied instanceof Entity
        ) {
          board.setGameOver(true);
        }
      }
    }
  });

  board.setTiles([...tiles]);
  return found;
};

//returns whether there is any cheese left on the board
export const isCheeseLeft = (board: BoardState) => {
  for (let i = 0; i < board.numberOfTiles; i++) {
    const found = board.tiles[i].find(
      (tile) => tile.occupied instanceof Consumable
    );
    if (found !== undefined) return true;
  }
  return false;
};
