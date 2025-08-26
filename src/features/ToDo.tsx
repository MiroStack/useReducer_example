import { useReducer, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Action {
  type: string;
  payload: {
    todo: string;
     id?: string;
  };
}
interface State {
  todos:todosModel[]
}
interface todosModel{
  id: string;
  todo: string;
  complete: boolean;
}

const reducer = (state: State, action: Action):State => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        todos:[...state.todos, newTodo(action.payload.todo)]
      };
    case ACTIONS.TOGGLE_TODO:
        return {
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, complete: !item.complete }
            : item
        ),
      };

    case ACTIONS.DELETE_TODO:
      return{
        todos:state.todos.filter((item)=>item.id !==  action.payload.id)
      };

    default:
     return state;  
  }
};

const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO:"delete-todo"
};

function newTodo(todo: string):todosModel {
  return { id: Date.now().toString(), todo: todo, complete: false };
}

export const Todo = () => {
  const [state, dispatch] = useReducer(reducer, {todos:[]});
  const navigate = useNavigate();
  const [myTodo, setMyTodo] = useState<string>("");
  const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyTodo(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { todo: myTodo } });
    setMyTodo("");
  };

  console.log(state);

  return (
    <div className="h-screen w-screen bg-amber-100 flex flex-col items-center justify-center">
      <p>This is a todo page</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Todo..."
          value={myTodo}
          onChange={handleTodo}
        />
      </form>
      <ul className="w-full flex flex-col items-center gap-2">
        {state.todos?.map((item, index) => (
          <li
            key={index}
            className={`w-2/4 flex items-center ${
              item.complete ? "bg-amber-200" : ""
            }`}
          >
            <span className="flex-1">{item.todo}</span>
            <div className="flex gap-2">
              <button className="w-18 h-12 bg-gray-100 rounded-md" onClick={()=>dispatch({type:ACTIONS.TOGGLE_TODO, payload:{todo:item.todo, id:item.id}})}>Toggle</button>
              <button className="w-18 h-12 bg-gray-100 rounded-md" onClick={()=>dispatch({type:ACTIONS.DELETE_TODO, payload:{todo:item.todo, id:item.id}})}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="mt-5 h-12 rounded w-18  bg-gray-400 absolute bottom-10 right-10"
        onClick={() => {
          navigate("/todo");
        }}
      >
        Next
      </button>
      <button
        className="mt-5 h-12 rounded w-18  bg-gray-400 absolute bottom-10 left-10"
        onClick={() => {
          navigate("/");
        }}
      >
        Prev
      </button>
    </div>
  );
};
