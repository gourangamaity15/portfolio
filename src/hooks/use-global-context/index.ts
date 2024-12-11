import { GlobalContext } from "../../context/global-context";
import  { useContext } from "react";

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
