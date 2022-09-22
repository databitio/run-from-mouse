import { useState } from "react";
import useBoard from "../hooks/useBoard";
import { Consumable, Tile } from "../context/BoardContext";
import "./Tile.css";
import { Entity } from "../context/EntityContext";
import EntityComponent from "./Entity";
import Cheese from "./Cheese";

//in milliseconds; 5000 is 5 seconds
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const TileComponent = (props: {
  tile: Tile;
  x: number;
  y: number;
  tileSize: number;
}) => {
  const { tile, tileSize } = props;
  const board = useBoard();
  const x = tile.x;
  const y = tile.y;

  const DegradeTile = async (time: number) => {
    await delay(time);
    board.tiles[x][y].active = false;
    board.setTiles([...board.tiles]);
  };

  const ActivateTile = async () => {
    if (!tile.blocked && !tile.active && board.chargeLeft > 0) {
      board.tiles[x][y].active = true;
      board.setChargeLeft(board.chargeLeft - 1);
      board.setTiles([...board.tiles]);
    }
  };

  return (
    <div
      className={
        tile.active
          ? "border-[1px] border-slate-500 bg-slate-500 transition-colors cursor-pointer flex items-center justify-center"
          : tile.blocked
          ? "border-[1px] border-slate-300 bg-slate-900 transition-colors cursor-pointer flex items-center justify-center"
          : tile.highlighted === true
          ? "border-[1px] bg-red-500 degrade-color cursor-pointer flex items-center justify-center"
          : tile.sniffed === true
          ? "border-[1px] bg-green-300 degrade-color cursor-pointer flex items-center justify-center"
          : "border-[1px] border-slate-300 bg-slate-200 degrade-color cursor-pointer flex items-center justify-center"
      }
      draggable={true}
      onDragLeave={() => DegradeTile(3000)}
      onDragEnter={() => ActivateTile()}
      style={{ width: tileSize, height: tileSize }}
    >
      {Object.keys(tile.occupied).length === 0 ? (
        <></>
      ) : tile.occupied instanceof Entity ? (
        <EntityComponent tileSize={tileSize} name={tile.occupied.name} />
      ) : tile.occupied instanceof Consumable ? (
        <Cheese size={tileSize} fake={false} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TileComponent;
