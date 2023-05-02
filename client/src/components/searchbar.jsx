import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchTodos } from "../redux/actions/index";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import useDebounce from "./useDebaunce";
import Todo from "./Todo";
import "./SearchBar.css";

function SearchBar({ placeholder, selectedTodos, handleChecked }) {
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
      return selectedTodos;
    } else if (currentTab === ACTIVE_TODOS) {
      return selectedTodos.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return selectedTodos.filter((todo) => todo.done);
    }
  };

  const getFilteredData = () => {
    return getTodosFiltered().map((todo) => (
      <Todo key={todo._id} todo={todo} handleChecked={handleChecked} />
    ));
  };

  const getAllData = () => {
    return getTodos().map((todo) => (
      <Todo key={todo._id} todo={todo} handleChecked={handleChecked} />
    ));
  };

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
      </div>
      <div>{wordEntered.length === 0 ? getAllData() : getFilteredData()}</div>
    </div>
  );
}

export default SearchBar;
