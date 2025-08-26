import { useReducer } from "react";
interface CounterState {
  count: number;
}
type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

const reducer = (state: CounterState, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" });
  };
  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div className="h-screen w-screen bg-amber-100 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <button className=" h-12 rounded w-12 bg-gray-300 active:bg-gray-200" onClick={handleDecrement}>
          -
        </button>
        <p>{state.count}</p>
        <button className=" h-12 rounded w-12 bg-gray-300 active:bg-gray-200" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};
