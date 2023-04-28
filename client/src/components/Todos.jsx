/* eslint-disable no-lone-blocks */
import { useEffect, useState } from "react";
// import React, { useState } from "react";
// import BookData from "../Data.json";
// import { getAllTodos } from "../redux/actions/index";
import { deleteTodo } from "../redux/actions/index";
// import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";
import SearchBar from "../components/searchbar";

import { useDispatch, useSelector } from "react-redux";

// import Todo from "./Todo";
import Tabs from "./Tabs";

export const Todos = () => {
  const dispatch = useDispatch();
  //
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const todos = useSelector((state) => state.todos);
  const currentTab = useSelector((state) => state.currentTab);

  const handleSetSelecTodo = (selecteData) => {
    setSelectedTodos(selecteData);
  };

  useEffect(() => {
    // dispatch(getAllTodos());
  }, [dispatch]);

  console.log("selectedTodos", selectedTodos);

  useEffect(() => {
    // dispatch(getAllTodos());
    const newArr1 = todos.map((v) => ({ ...v, isSelected: false }));
    setSelectedTodos(newArr1);
  }, [todos]);

  // console.log(
  //   "New array: ",
  //   selectedTodos.map(({ isSelected }) => isSelected)
  // );
  // const getTodos = () => {
  //   if (currentTab === ALL_TODOS) {
  //     return todos;
  //   } else if (currentTab === ACTIVE_TODOS) {
  //     return todos.filter((todo) => !todo.done);
  //   } else if (currentTab === DONE_TODOS) {
  //     return todos.filter((todo) => todo.done);
  //   }
  // };

  const toggle = () => {
    setIsAllChecked(!isAllChecked);
    const allSelectedTodos = selectedTodos.map((v) => ({
      ...v,
      isSelected: !isAllChecked,
    }));
    setSelectedTodos(allSelectedTodos);
    // var checkboxes = document.getElementsByName("listCheckbox");
    // var checkBox = document.getElementById("selectAll");
    // switch (checkBox.checked) {
    //   case true:
    //     {
    //       for (var i = 0; i < checkboxes.length; i++) {
    //         checkboxes[i].checked = true;
    //       }
    //     }
    //     break;
    //   case false:
    //     {
    //       for (var j = 0; j < checkboxes.length; j++) {
    //         checkboxes[j].checked = false;
    //       }
    //     }
    //     break;
    //   default:
    //     {
    //       console.log("Invalid input type");
    //     }
    //     break;
    // }
  };

  const removeCheckedTodos = () => {
    selectedTodos.forEach(({ isSelected, _id }) => {
      if (isSelected) {
        dispatch(deleteTodo(_id));
      }
    });
  };
  // const removeDoneTodos = () => {
  //   todos.forEach(({ done, _id }) => {
  //     if (done) {
  //       dispatch(deleteTodo(_id));
  //     }
  //   });
  // };

  return (
    <article>
      <div>
        <Tabs currentTab={currentTab} />

        {selectedTodos.some(({ isSelected }) => isSelected) === false ? (
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
              defaultChecked={false}
              // onChange={(event) => selectAll(event.target.checked)}
            />
            <li className="listHeader" key={selectedTodos}>
              <span className="taskDetailsHeading">ToDos</span>
            </li>
          </div>
          <SearchBar
            placeholder="Enter a Task Name..."
            selectedTodos={selectedTodos}
            handleSetSelecTodo={handleSetSelecTodo}
          />
        </ul>
      </div>
    </article>
  );
};

export default Todos;
