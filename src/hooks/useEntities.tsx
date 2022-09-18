import { useContext } from "react";
import EntityContext from "../context/EntityContext";

const useEntities = () => {
  return useContext(EntityContext);
};

export default useEntities;
