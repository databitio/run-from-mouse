import { useContext } from "react";
import BoardContext from "../context/BoardContext";

const useBoard = () => {
  return useContext(BoardContext);
};

export default useBoard;
