import { MoveDown, MoveUp, MoveRight, MoveLeft } from "./Entity";
import useBoard from "../hooks/useBoard";
const TestMoveButtons = (props: {
  x: number;
  y: number;
  setX: (x: number) => void;
  setY: (y: number) => void;
}) => {
  const { x, y, setX, setY } = props;
  const board = useBoard();

  return (
    <div className="flex flex-row">
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          MoveLeft(board, x, y, setX);
        }}
      >
        Left
      </button>
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          MoveRight(board, x, y, setX);
        }}
      >
        Right
      </button>
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          MoveUp(board, x, y, setY);
        }}
      >
        Up
      </button>
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          MoveDown(board, x, y, setY);
        }}
      >
        Down
      </button>
    </div>
  );
};

export default TestMoveButtons;
