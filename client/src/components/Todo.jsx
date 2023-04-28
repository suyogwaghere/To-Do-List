import { useState } from "react";

import { toggleTodo, updateTodo } from "../redux/actions";
import { deleteTodo } from "../redux/actions";

import { useDispatch } from "react-redux";

const Todo = ({ todo, handleSetSelecTodo, selectedTodos }) => {
  console.log("handleSetSelecTodo", handleSetSelecTodo);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo?.data);

  // const [selectedTodos, setSelectedTodos] = useState([]);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(getAllTodos());
  //   const newArr1 = todo.map((v) => ({ ...v, isSelected: false }));
  //   setSelectedTodos(newArr1);
  // }, [todo]);
  const editForm = () => {
    setEditing(true);
  };

  const submitForm = (e) => {
    setEditing(false);
    dispatch(updateTodo(todo._id, text));
  };

  const handleChange = () => {
    dispatch(toggleTodo(todo._id));
  };

  const handleChecked = () => {
    for (var i in selectedTodos) {
      if (selectedTodos[i]._id == todo._id) {
        selectedTodos[i].isSelected = !todo.isSelected;
        break; //Stop this loop, we found it!
      }
    }
    handleSetSelecTodo(selectedTodos);
  };

  console.log("suyog", selectedTodos);
  return (
    // <div className="listComponent">
    <div className="listItems">
      <input
        type="checkbox"
        name="listCheckbox"
        className="checkBox"
        checked={todo.isSelected}
        key={todo._id}
        onChange={(e) => handleChecked(e)}
        // onClick={handleChecked()}
      />
      <li
        className="task"
        key={todo._id}
        style={{
          // textDecoration: todo?.done ? "" : "line-through ",
          // color: todo?.done ? "#bdc3c7" : "#34495e",
          backgroundColor: todo?.done ? "#f2ba00" : " ",
        }}
        data-testid="todo-test"
      >
        <span
          className="taskDetails"
          style={{
            display: editing === true ? "none" : "",
            textDecoration: todo?.done ? "line-through" : "",
          }}
        >
          {todo?.data}
        </span>

        <form
          style={{ display: editing === true ? "inline" : "none" }}
          onSubmit={submitForm}
        >
          <input
            type="text"
            value={text}
            className="edit-todo"
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <span className="icon" onClick={handleChange}>
          <i className="fa fa-check-circle"></i>
        </span>

        <span className="icon" onClick={() => dispatch(deleteTodo(todo._id))}>
          <i className="fas fa-trash" />
        </span>

        {editing === false ? (
          <span
            className="icon"
            onClick={editForm}
            // onClick={() => setEditing((prevState) => !prevState)}
          >
            <i className="fas  fa-pen" />
          </span>
        ) : (
          <span className="icon" onClick={submitForm}>
            <i className="fas fa-check-square"></i>
          </span>
        )}
      </li>
    </div>
    // </div>
  );
};

export default Todo;
