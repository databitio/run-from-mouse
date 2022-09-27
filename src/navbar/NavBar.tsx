import { createTiles } from "../context/BoardContext";
import useBoard from "../hooks/useBoard";
import useEntities from "../hooks/useEntities";
import { Entity } from "../context/EntityContext";

const NavBar = (props: {
  start: boolean;
  setStart: (start: boolean) => void;
}) => {
  const { start, setStart } = props;
  const board = useBoard();
  const entities = useEntities();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      numberOfTiles: { value: string };
      tileSize: { value: string };
    };
    const numberOfTiles = parseInt(target.numberOfTiles.value);
    const tileSize = parseInt(target.tileSize.value);

    entities.setMouse(new Entity("mouse", 0, 0));
    entities.setCheese(
      new Entity("cheese", numberOfTiles - 1, numberOfTiles - 1)
    );

    entities.cheese.x = numberOfTiles - 1;
    entities.cheese.y = numberOfTiles - 1;
    entities.cheese.speed = 1;

    board.setChargeLeft(20);
    board.setNumberOfTiles(numberOfTiles);
    board.setTileSize(tileSize);

    const new_tiles = createTiles(numberOfTiles);
    board.setTiles(new_tiles);
    setStart(true);
    board.setWin(false);
  };

  return (
    <form
      className="fixed top-0 left-0 max-h-[50px] w-full bg-slate-600 z-20 flex 
        flex-row items-center justify-between text-neutral-200 overflow-x-scroll"
      onSubmit={handleSubmit}
    >
      <div className="mx-2">
        Checkout this project on{" "}
        <button
          onClick={() => {
            window.open(
              "https://github.com/databitio/run-from-mouse",
              "_blank"
            );
          }}
          className="text-green-500 font-bold"
        >
          Github
        </button>
        !
      </div>
      <section className="flex flex-row">
        <div className="flex m-2">
          <label className=""># of tiles</label>
          <input
            type="number"
            min={4}
            max={50}
            name="numberOfTiles"
            className="rounded-md w-[50px] h-[25px] text-black p-1 mx-2"
            placeholder={board.numberOfTiles.toString()}
            defaultValue={board.numberOfTiles.toString()}
            disabled={board.gameOver === false}
          />
        </div>
        <div className="flex m-2">
          <label className="">Tile size</label>
          <input
            min={5}
            max={90}
            type="number"
            name="tileSize"
            className="rounded-md w-[50px] h-[25px] text-black p-1 mx-2"
            placeholder={board.tileSize.toString()}
            defaultValue={board.tileSize.toString()}
          />
          {/* <input type="number" /> */}
        </div>
        <button
          className={
            !start && board.gameOver
              ? "w-[100px] m-2 bg-green-500 rounded-md transition-all"
              : "w-[100px] m-2 bg-slate-800 rounded-md transition-all"
          }
        >
          Reset
        </button>
      </section>
    </form>
  );
};

export default NavBar;
