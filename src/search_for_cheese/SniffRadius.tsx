import { ObjectFlags } from "typescript";
import { delay } from "../board/Tile";
import { BoardState } from "../context/BoardContext";
import { Tile } from "../context/BoardContext";
import { Entity } from "../context/EntityContext";

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
    console.log("child and parent: ", prevTile, tile);
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
};

export const sniffRange = async (
  board: BoardState,
  mouse: Entity,
  startTile: Tile,
  radius: number
) => {
  const x = startTile.x;
  const y = startTile.y;
  const speed = 1000 / mouse.speed;
  //child and parent; start node has no parent
  const visited = new Map<Tile, Tile>();
  visited.set(startTile, {} as Tile);
  board.tiles[y][x].sniffed = true;

  for (let i = 0; i < radius; i++) {
    const found = sniffBoard(board, mouse, visited);
    await delay(speed);
    if (Object.keys(found).length > 0) {
      highlightTiles(board, visited, found, speed);
      await delay(speed);
      resetSniffedTiles(board);
      return;
    }
  }
  resetSniffedTiles(board);
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
      }
    }
    if (x < board.numberOfTiles - 1 && !isActive(tiles[y][x + 1])) {
      tiles[y][x + 1].sniffed = true;
      tiles[y][x + 1].nextMove = mouse.MoveRight;
      visited.set(tiles[x + 1][y], tiles[x][y]);
      if (Object.keys(tiles[y][x + 1].occupied).length > 0) {
        found = tiles[x + 1][y];
      }
    }
    if (y > 0 && !isActive(tiles[y - 1][x])) {
      tiles[y - 1][x].sniffed = true;
      tiles[y - 1][x].nextMove = mouse.MoveUp;
      visited.set(tiles[x][y - 1], tiles[x][y]);
      if (Object.keys(tiles[y - 1][x].occupied).length > 0) {
        found = tiles[x][y - 1];
      }
    }
    if (y < board.numberOfTiles - 1 && !isActive(tiles[y + 1][x])) {
      tiles[y + 1][x].sniffed = true;
      tiles[y + 1][x].nextMove = mouse.MoveDown;
      visited.set(tiles[x][y + 1], tiles[x][y]);
      if (Object.keys(tiles[y + 1][x].occupied).length > 0) {
        found = tiles[x][y + 1];
      }
    }
  });

  board.setTiles([...tiles]);
  return found;
};
