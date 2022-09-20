import { delay } from "../board/Tile";
import { BoardState } from "../context/BoardContext";
import { Tile } from "../context/BoardContext";

const isActive = (tile: Tile) => {
  if (tile.sniffed || tile.active || tile.blocked) {
    return true;
  }
  return false;
};

export const sniff = (board: BoardState, visited: Tile[]) => {
  const tiles = board.tiles;
  const this_visited = [...visited];
  let found = false;
  console.log("started sniffing!");

  for (let i = 0; i < this_visited.length; i++) {
    const x = this_visited[i].x;
    const y = this_visited[i].y;

    if (x > 0 && !isActive(tiles[y][x - 1])) {
      tiles[y][x - 1].sniffed = true;
      visited.push(tiles[x - 1][y]);
      if (Object.keys(tiles[y][x - 1].occupied).length > 0) {
        found = true;
      }
    }
    if (x < board.numberOfTiles - 1 && !isActive(tiles[y][x + 1])) {
      tiles[y][x + 1].sniffed = true;
      visited.push(tiles[x + 1][y]);
      if (Object.keys(tiles[y][x + 1].occupied).length > 0) {
        found = true;
      }
    }
    if (y > 0 && !isActive(tiles[y - 1][x])) {
      tiles[y - 1][x].sniffed = true;
      visited.push(tiles[x][y - 1]);
      if (Object.keys(tiles[y - 1][x].occupied).length > 0) {
        found = true;
      }
    }
    if (y < board.numberOfTiles - 1 && !isActive(tiles[y + 1][x])) {
      tiles[y + 1][x].sniffed = true;
      visited.push(tiles[x][y + 1]);
      if (Object.keys(tiles[y + 1][x].occupied).length > 0) {
        found = true;
      }
    }
  }

  board.setTiles([...tiles]);
  return found;
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

export const sniffRange = async (
  board: BoardState,
  startTile: Tile,
  radius: number,
  speed: number
) => {
  const x = startTile.x;
  const y = startTile.y;
  const visited: Tile[] = [startTile];
  board.tiles[y][x].sniffed = true;

  for (let i = 0; i < radius; i++) {
    const found = sniff(board, visited);
    await delay(speed);
    if (found) {
      resetSniffedTiles(board);
      return;
    }
  }
  resetSniffedTiles(board);
};
