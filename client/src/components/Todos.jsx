import { useEffect } from "react";
// import React, { useState } from "react";
// import BookData from "../Data.json";
import { getAllTodos } from "../redux/actions/index";
import { deleteTodo } from "../redux/actions/index";
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";
import SearchBar from "../components/searchbar";

import { useDispatch, useSelector } from "react-redux";

import Todo from "./Todo";
import Tabs from "./Tabs";

export const Todos = () => {
  const dispatch = useDispatch();
  //
  const todos = useSelector((state) => state.todos);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const getTodos = () => {
    if (currentTab === ALL_TODOS) {
      return todos;
    } else if (currentTab === ACTIVE_TODOS) {
      return todos.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return todos.filter((todo) => todo.done);
    }
  };

  const toggle = () => {
    var checkboxes = document.getElementsByName("listCheckbox");
    // var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
      console.log("sdad");
      checkboxes[i].checked = true;
      // var check = document.getElementById("selectAll");
      // var isCheck = check.checked;
      // console.log(isCheck);
      // if (checkboxes[i].checked === isCheck) {
      //   checkboxes[i].checked = false;
      //   console.log("checkbox true");
      // }

      // if (checkboxes[i].type === "checkbox") {
      //   if (checkboxes[i].checked === false) {
      //     checkboxes[i].checked = true;
      //     console.log("checkbox true");
      //   } else {
      //     checkboxes[i].checked = false;
      //     console.log("checkbox false");
      //   }
      // }
    }
  };

  const removeDoneTodos = () => {
    todos.forEach(({ done, _id }) => {
      if (done) {
        dispatch(deleteTodo(_id));
      }
    });
  };

  return (
    <article>
      <div>
        <Tabs currentTab={currentTab} />
        {
          // todos.some(todo => todo.done)
          currentTab === DONE_TODOS ? (
            <button onClick={removeDoneTodos} className="button clear">
              Remove Todos
            </button>
          ) : null
        }
      </div>
      {<SearchBar placeholder="Enter a Task Name..." />}
      <div>
        <ul>
          <div className="taskHeader">
            {/* {" "} */}
            <input
              id="selectAll"
              type="checkbox"
              name="myCheckbox"
              className="checkBox"
              // checked={false}
              onClick={toggle}
              // defaultChecked={false}
              // onChange={(event) => selectAll(event.target.checked)}
            />
            <li className="listHeader">
              <span
                className="taskDetailsHeading"
                // style={{
                //   display: editing === true ? "none" : "",
                //   textDecoration: todo?.done ? "line-through" : "",
                // }}
              >
                ToDos
              </span>

              <span
                className="icon"
                // onClick={handleChange}
              >
                <i className="fa fa-check-circle"></i>
              </span>

              <span
                className="icon"
                // onClick={() => dispatch(deleteTodo(todo._id))}
              >
                <i className="fas fa-trash" />
              </span>

              {/* {editing === false ? (
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
          )} */}
            </li>
          </div>
          {getTodos().map((todo) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Todos;
