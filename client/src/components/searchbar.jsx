import React, { useState } from "react";
import "./SearchBar.css";

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch , useSelector} from 'react-redux';
import { useEffect } from 'react';
import { searchTodos } from '../redux/actions/index';


function SearchBar({ placeholder, dataset}) {

  const dispatch = useDispatch();

  const todos = useSelector(state => state.todos);
  
    const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [wordSearched, setWordSearched] = useState("");
  


  useEffect(() => {
    dispatch(searchTodos(wordEntered));
    setFilteredData(todos.data);
    console.log("use effects");
    console.log(todos);
    }, [])
    
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    
    dispatch(searchTodos(searchWord));
    console.log("call api");
      console.log({dataset});
      
    setWordEntered(searchWord);
    const newFilter = dataset.filter((dataTod) => {
      return "todo.data.includes(searchWord)";
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {/* {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              // <a className="dataItem" href={value.link} target="_blank">
                <p>{value.data} </p>
              // </a>
            );
          })}
        </div>
      )} */}
    </div>
  );
}

export default SearchBar;
