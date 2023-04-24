import React, { useState } from "react";
import "./SearchBar.css";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { searchTodos } from "../redux/actions/index";
import useDebounce from "./useDebaunce";

function SearchBar({ placeholder, dataset }) {
  const dispatch = useDispatch();
  const newFilter = useSelector((state) => state.searchWord).map(
    ({ data }) => data
  );
  const [wordEntered, setWordEntered] = useState("");
  const searchValue = useDebounce(wordEntered, 1000);

  useEffect(() => {
    async function fetchData() {
      setWordEntered(searchValue);
      console.log(searchValue);
      dispatch(searchTodos(searchValue));
    }
    if (searchValue) fetchData();
  }, [searchValue, dispatch]);

  const clearInput = () => {
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={(e) => setWordEntered(e.target.value)}
        />
        <div className="searchIcon">
          {newFilter.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {wordEntered === "" ? " " : ""}
      <div className="dataResult" hidden={wordEntered === "" ? "hidden" : ""}>
        <ul>
          {newFilter.map((item) => {
            return (
              <li className="dataItem">
                <p>{item}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
