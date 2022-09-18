import useBoard from "../hooks/useBoard";
import useEntities from "../hooks/useEntities";
const TestMoveButtons = () => {
  const board = useBoard();
  const entities = useEntities();

  return (
    <div className="flex flex-row">
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          entities.mouse.MoveLeft(board);
        }}
      >
        Left
      </button>
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          entities.mouse.MoveRight(board);
        }}
      >
        Right
      </button>
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          entities.mouse.MoveUp(board);
        }}
      >
        Up
      </button>
      <button
        className="bg-slate-700 text-white w-[80px] m-2"
        onClick={() => {
          entities.mouse.MoveDown(board);
        }}
      >
        Down
      </button>
    </div>
  );
};

export default TestMoveButtons;
