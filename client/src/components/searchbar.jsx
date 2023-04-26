import React, { useState } from "react";
import "./SearchBar.css";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchTodos } from "../redux/actions/index";
import { getAllTodos } from "../redux/actions/index";
// import { deleteTodo } from "../redux/actions/index";
import useDebounce from "./useDebaunce";

import Todo from "./Todo";
// import Tabs from "./Tabs";
function SearchBar({ placeholder }) {
  const dispatch = useDispatch();
  const newFilter = useSelector((state) => state.searchWord);
  //   .map(
  //   ({ data }) => data
  // );
  const todos = useSelector((state) => state.todos);
  const currentTab = useSelector((state) => state.currentTab);

  const [wordEntered, setWordEntered] = useState("");
  const searchValue = useDebounce(wordEntered, 1000);
  // console.log(newFilter);

  useEffect(() => {
    dispatch(getAllTodos());
    async function fetchData() {
      setWordEntered(searchValue);

      dispatch(searchTodos(searchValue));
    }
    if (searchValue) fetchData();
  }, [searchValue, dispatch]);

  const clearInput = () => {
    setWordEntered("");
  };

  const getTodosFiltered = () => {
    if (currentTab === ALL_TODOS) {
      return newFilter;
    } else if (currentTab === ACTIVE_TODOS) {
      return newFilter.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return newFilter.filter((todo) => todo.done);
    }
  };
  const getTodos = () => {
    if (currentTab === ALL_TODOS) {
      return todos;
    } else if (currentTab === ACTIVE_TODOS) {
      return todos.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return todos.filter((todo) => todo.done);
    }
  };

  const getFilteredData = () => {
    return getTodosFiltered().map((todo) => (
      <Todo key={todo._id} todo={todo} />
    ));
  };
  const getAllData = () => {
    return (
      // {console.log("all printed")
      getTodos().map((todo) => <Todo key={todo._id} todo={todo} />)
    );
  };

  // const removeDoneTodos = () => {
  //   todos.forEach(({ done, _id }) => {
  //     if (done) {
  //       dispatch(deleteTodo(_id));
  //     }
  //   });
  // };

  return (
    <div>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={(e) => setWordEntered(e.target.value)}
          />
          <div className="searchIcon">
            {wordEntered.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {/* {wordEntered === "" ? " " : ""} */}
        {/* <div className="dataResult" hidden={wordEntered === "" ? "hidden" : ""}>
          <ul>
            {newFilter.map((item) => {
              return (
                <li className="dataItem">
                  <p>{item}</p>
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
      <div>{wordEntered.length === 0 ? getAllData() : getFilteredData()}</div>
    </div>
  );
}

export default SearchBar;
