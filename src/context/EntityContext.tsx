import { createContext, useEffect, useState } from "react";
import { Entity } from "../board/Entity";
import useBoard from "../hooks/useBoard";

export interface EntityContext {
  mouse: Entity;
  setMouse: (mouse: Entity) => void;
}

const EntityContext = createContext<EntityContext>({} as EntityContext);

export const EntityProvider = (props: any) => {
  const { children } = props;
  const [mouse, setMouse] = useState(new Entity("mouse", 0, 0));
  const board = useBoard();

  useEffect(() => {
    board.tiles[0][0].occupied = mouse;
    board.setTiles(board.tiles);
  }, []);

  const entities: EntityContext = {
    mouse: mouse,
    setMouse: setMouse,
  };

  return (
    <EntityContext.Provider value={entities}>{children}</EntityContext.Provider>
  );
};

export default EntityContext;
