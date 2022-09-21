import { ObjectFlags } from "typescript";
import { delay } from "../board/Tile";
import { BoardState } from "../context/BoardContext";
import { Tile } from "../context/BoardContext";

const isActive = (tile: Tile) => {
  if (tile.sniffed || tile.active || tile.blocked) {
    return true;
  }
  return false;
};

// export const sniff = (board: BoardState, visited: Tile[]) => {
//   const tiles = board.tiles;
//   const this_visited = [...visited];
//   let found = false;

//   for (let i = 0; i < this_visited.length; i++) {
//     const x = this_visited[i].x;
//     const y = this_visited[i].y;

//     if (x > 0 && !isActive(tiles[y][x - 1])) {
//       tiles[y][x - 1].sniffed = true;
//       visited.push(tiles[x - 1][y]);
//       if (Object.keys(tiles[y][x - 1].occupied).length > 0) {
//         found = true;
//       }
//     }
//     if (x < board.numberOfTiles - 1 && !isActive(tiles[y][x + 1])) {
//       tiles[y][x + 1].sniffed = true;
//       visited.push(tiles[x + 1][y]);
//       if (Object.keys(tiles[y][x + 1].occupied).length > 0) {
//         found = true;
//       }
//     }
//     if (y > 0 && !isActive(tiles[y - 1][x])) {
//       tiles[y - 1][x].sniffed = true;
//       visited.push(tiles[x][y - 1]);
//       if (Object.keys(tiles[y - 1][x].occupied).length > 0) {
//         found = true;
//       }
//     }
//     if (y < board.numberOfTiles - 1 && !isActive(tiles[y + 1][x])) {
//       tiles[y + 1][x].sniffed = true;
//       visited.push(tiles[x][y + 1]);
//       if (Object.keys(tiles[y + 1][x].occupied).length > 0) {
//         found = true;
//       }
//     }
//   }

//   board.setTiles([...tiles]);
//   return found;
// };

const resetSniffedTiles = (board: BoardState) => {
  board.tiles.forEach((row) => {
    row.forEach((tile) => {
      tile.sniffed = false;
    });
  });
  board.setTiles([...board.tiles]);
  return;
};

const highlightTiles = (
  board: BoardState,
  tiles: Map<Tile, Tile>,
  endTile: Tile
) => {
  //while parent tile does not equal empty object
  //highlight tiles
  //add to an array
  //set board state
  board.tiles[endTile.y][endTile.x].highlighted = true;
  let prevTile = endTile;
  while (true) {
    const tile = tiles.get(prevTile);
    console.log("child and parent: ", prevTile, tile);
    if (tile === undefined || Object.keys(tile).length === 0) {
      break;
    }
    board.tiles[tile.y][tile.x].highlighted = true;
    prevTile = tile;
  }
  board.setTiles([...board.tiles]);
};

export const sniffRange = async (
  board: BoardState,
  startTile: Tile,
  radius: number,
  speed: number
) => {
  const x = startTile.x;
  const y = startTile.y;
  //child and parent; start node has no parent
  const visited = new Map<Tile, Tile>();
  visited.set(startTile, {} as Tile);
  board.tiles[y][x].sniffed = true;

  for (let i = 0; i < radius; i++) {
    const found = sniffBoard(board, visited);
    await delay(speed);
    if (Object.keys(found).length > 0) {
      highlightTiles(board, visited, found);
      await delay(speed);
      resetSniffedTiles(board);
      return;
    }
  }
  resetSniffedTiles(board);
};

//visited is a child, parent map; in this function, children are becoming parents to other tiles
export const sniffBoard = (board: BoardState, visited: Map<Tile, Tile>) => {
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
      visited.set(tiles[x - 1][y], tiles[x][y]);
      if (Object.keys(tiles[y][x - 1].occupied).length > 0) {
        // found = tiles[y][x - 1];
        found = tiles[x - 1][y];
      }
    }
    if (x < board.numberOfTiles - 1 && !isActive(tiles[y][x + 1])) {
      tiles[y][x + 1].sniffed = true;
      visited.set(tiles[x + 1][y], tiles[x][y]);
      if (Object.keys(tiles[y][x + 1].occupied).length > 0) {
        // found = tiles[y][x + 1];
        found = tiles[x + 1][y];
      }
    }
    if (y > 0 && !isActive(tiles[y - 1][x])) {
      tiles[y - 1][x].sniffed = true;
      visited.set(tiles[x][y - 1], tiles[x][y]);
      if (Object.keys(tiles[y - 1][x].occupied).length > 0) {
        // found = tiles[y - 1][x];
        found = tiles[x][y - 1];
      }
    }
    if (y < board.numberOfTiles - 1 && !isActive(tiles[y + 1][x])) {
      tiles[y + 1][x].sniffed = true;
      visited.set(tiles[x][y + 1], tiles[x][y]);
      if (Object.keys(tiles[y + 1][x].occupied).length > 0) {
        // found = tiles[y + 1][x];
        found = tiles[x][y + 1];
      }
    }
  });

  board.setTiles([...tiles]);
  return found;
};
