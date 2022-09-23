import { createTiles } from "../context/BoardContext";
import useBoard from "../hooks/useBoard";
import useEntities from "../hooks/useEntities";

const NavBar = () => {
  const board = useBoard();
  const entities = useEntities();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("saved!");
    const target = e.target as typeof e.target & {
      numberOfTiles: { value: string };
      tileSize: { value: string };
    };
    const numberOfTiles = parseInt(target.numberOfTiles.value);
    const tileSize = parseInt(target.tileSize.value);

    entities.mouse.x = 0;
    entities.mouse.y = 0;

    entities.cheese.x = numberOfTiles - 1;
    entities.cheese.y = numberOfTiles - 1;

    board.setNumberOfTiles(numberOfTiles);
    board.setTileSize(tileSize);

    const new_tiles = createTiles(numberOfTiles);
    board.setTiles(new_tiles);
  };

  return (
    <form
      className="absolute top-0 left-0 max-h-[50px] w-full bg-slate-600 flex 
        flex-row items-center justify-end text-neutral-200 overflow-x-scroll"
      onSubmit={handleSubmit}
    >
      <div className="flex m-2">
        <label className=""># of tiles</label>
        <input
          name="numberOfTiles"
          className="rounded-md w-[50px] h-[25px] text-black p-1 mx-2"
          placeholder={board.numberOfTiles.toString()}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength={2}
          defaultValue={board.numberOfTiles.toString()}
          disabled={board.gameOver === false}
        />
      </div>
      <div className="flex m-2">
        <label className="">Tile size</label>
        <input
          name="tileSize"
          className="rounded-md w-[50px] h-[25px] text-black p-1 mx-2"
          placeholder={board.tileSize.toString()}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength={2}
          defaultValue={board.tileSize.toString()}
        />
      </div>
      <button className="w-[100px] m-2 bg-slate-800 rounded-md">Reset</button>
    </form>
  );
};

export default NavBar;
