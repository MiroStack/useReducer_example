import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
interface CounterState {
  count: number;
}


export const ACTIONS={
  increment:"INCREMENT",
  decrement:"DECREMENT"
}

const reducer = (state: CounterState, action: any) => {
  switch (action.type) {
    case ACTIONS.increment:
      return { count: state.count + 1 };
    case ACTIONS.decrement:
      return { count: state.count - 1 };
    default:
      return state;
  }
};
export const Counter = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const handleIncrement = () => {
    dispatch({ type: ACTIONS.increment });
  };
  const handleDecrement = () => {
    dispatch({ type: ACTIONS.decrement });
  };

  return (
    <div className="h-screen w-screen bg-amber-100 flex flex-col items-center justify-center relative">
      <div className="flex items-center gap-2">
        <button
          className=" h-12 rounded w-12 bg-gray-300 active:bg-gray-200"
          onClick={handleDecrement}
        >
          -
        </button>
        <p>{state.count}</p>
        <button
          className=" h-12 rounded w-12 bg-gray-300 active:bg-gray-200"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>

      <button className="mt-5 h-12 rounded w-18  bg-gray-400 absolute bottom-10 right-10" onClick={()=>{navigate("/todo")}}>Next</button>
    </div>
  );
};
