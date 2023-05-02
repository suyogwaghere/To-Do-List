import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/searchbar";
import { getAllTodos, deleteTodo } from "../redux/actions/index";

// import Todo from "./Todo";
import Tabs from "./Tabs";

export const Todos = () => {
  const dispatch = useDispatch();

  const [selectedTodos, setSelectedTodos] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const todos = useSelector((state) => state.todos);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  useEffect(() => {
    const newData = todos.map((v) => ({ ...v, isSelected: false }));
    setSelectedTodos(newData);
  }, [todos]);

  useEffect(() => {
    console.log("Top", selectedTodos);
  }, [selectedTodos]);

  const handleChecked = (todo) => {
    console.log("handle check for single", todo);
    const allSelectedTodos = selectedTodos.map((element, index) => {
      if (element._id === todo._id) {
        return { ...element, isSelected: !element.isSelected };
      } else {
        return element;
      }
    });
    setSelectedTodos(allSelectedTodos);
    console.log("handle check for single", allSelectedTodos);
  };
  const toggle = () => {
    setIsAllChecked(!isAllChecked);
    const allSelectedTodos = selectedTodos.map((v) => ({
      ...v,
      isSelected: !isAllChecked,
    }));
    setSelectedTodos(allSelectedTodos);
  };

  const removeCheckedTodos = () => {
    selectedTodos.forEach(({ isSelected, _id }) => {
      console.log("for each selected", isSelected);
      if (isSelected) {
        dispatch(deleteTodo(_id));
      }
    });
  };

  return (
    <article>
      <div>
        <Tabs currentTab={currentTab} />
        {selectedTodos.some(({ isSelected }) => isSelected) === true ? (
          <button onClick={removeCheckedTodos} className="button clear">
            Remove Todos
          </button>
        ) : null}
      </div>
      <div>
        <ul>
          <div className="taskHeader">
            <input
              id="selectAll"
              type="checkbox"
              name="myCheckbox"
              className="checkBox"
              checked={isAllChecked}
              onChange={toggle}
            />
            <li className="listHeader" key={selectedTodos}>
              <span className="taskDetailsHeading">ToDos</span>
            </li>
          </div>
          <SearchBar
            placeholder="Enter a Task Name..."
            selectedTodos={selectedTodos}
            setSelectedTodos={setSelectedTodos}
            handleChecked={handleChecked}
          />
        </ul>
      </div>
    </article>
  );
};

export default Todos;
