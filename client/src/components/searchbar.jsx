import React, { useState } from "react";
import "./SearchBar.css";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchTodos } from "../redux/actions/index";
// import { getAllTodos } from "../redux/actions/index";

import useDebounce from "./useDebaunce";

import Todo from "./Todo";

function SearchBar({ placeholder, selectedTodos, handleChecked }) {
  console.log("selectedTodos", selectedTodos);
  const dispatch = useDispatch();
  const [wordEntered, setWordEntered] = useState("");

  const currentTab = useSelector((state) => state.currentTab);
  const searchValue = useDebounce(wordEntered, 1000);
  const newFilter = useSelector((state) => state.searchWord);

  useEffect(() => {
    async function fetchData() {
      setWordEntered(searchValue);
      dispatch(searchTodos(searchValue));
    }
    if (searchValue) fetchData();
  }, [searchValue, dispatch]);

  const clearInput = () => {
    setWordEntered("");
  };

  // const getTodosFiltered = () => {
  //   if (currentTab === ALL_TODOS) {
  //     return newFilter;
  //   } else if (currentTab === ACTIVE_TODOS) {
  //     return newFilter.filter((todo) => !todo.done);
  //   } else if (currentTab === DONE_TODOS) {
  //     return newFilter.filter((todo) => todo.done);
  //   }
  // };
  const getTodos = () => {
    if (currentTab === ALL_TODOS) {
      return selectedTodos;
    } else if (currentTab === ACTIVE_TODOS) {
      return selectedTodos.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return selectedTodos.filter((todo) => todo.done);
    }
  };

  const getFilteredData = () => {
    return selectedTodos.map((todo) => (
      <Todo key={todo._id} todo={todo} handleChecked={handleChecked} />
    ));
  };

  const getAllData = () => {
    return getTodos().map((todo) => (
      <Todo key={todo._id} todo={todo} handleChecked={handleChecked} />
    ));
  };
  // const removeDoneTodos = () => {
  //   todos.forEach(({ done, _id }) => {
  //     if (done) {
  //       dispatch(deleteTodo(_id));
  //     }
  //   });
  // };
  // useEffect(() => {
  //   // dispatch(getAllTodos());

  // }, [setAllTodos, getTodos]);
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
      {/* <div>{wordEntered.length === 0 ? getAllData() : getFilteredData()}</div> */}
    </div>
  );
}

export default SearchBar;
