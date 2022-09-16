import { useState } from "react";
import "./Tile.css";

//in milliseconds; 5000 is 5 seconds
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const DegradeTile = async (
  setActive: (active: boolean) => void,
  time: number
) => {
  await delay(time);
  setActive(false);
};

const Tile = (props: { x: number; y: number }) => {
  const { x, y } = props;
  const [active, setActive] = useState(false);
  return (
    <div
      className={
        active
          ? "w-[30px] h-[30px] border-[1px] border-neutral-300 bg-neutral-500  transition-colors cursor-pointer"
          : "w-[30px] h-[30px] border-[1px] border-neutral-300 bg-neutral-200 hover:bg-neutral-300 degrade-color cursor-pointer"
      }
      onMouseLeave={() => {
        DegradeTile(setActive, 5000);
      }}
      draggable={true}
      onDragLeave={() => DegradeTile(setActive, 5000)}
      onDragEnter={() => setActive(true)}
    />
  );
};

export default Tile;
