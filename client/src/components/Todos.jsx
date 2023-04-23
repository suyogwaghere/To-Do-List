import { useEffect } from 'react';
import BookData from "../Data.json";
import { getAllTodos } from '../redux/actions/index';
import { deleteTodo } from '../redux/actions/index';
import { searchTodos } from '../redux/actions/index';
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from '../redux/actions/type';
import SearchBar from "../components/searchbar";

import { useDispatch, useSelector } from 'react-redux';



import Todo from './Todo';
import Tabs from './Tabs';


export const Todos = () => {

    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos);
    const currentTab = useSelector(state => state.currentTab);
      
    useEffect(() => {
        dispatch(getAllTodos());
    },[])

    const getTodos = () => {
        if (currentTab === ALL_TODOS) {
            return todos;
        } else if (currentTab === ACTIVE_TODOS) {
            return todos.filter(todo => !todo.done)
        } else if (currentTab === DONE_TODOS) {
            return todos.filter(todo => todo.done)
        }
    }

    const searchTodos = (data) => {
        return data;
    }

    const removeDoneTodos = () => {
        todos.forEach(({ done, _id }) => {
            if (done) {
                dispatch(deleteTodo(_id));
            }
        })
    }

    return (
        <article>
            {
                // searchTodos().map(todo => (todo = <SearchBar 
                //     todo={todo}
                //     placeholder="Enter a Book Name..."
                //     data={BookData}
                // />
                // ))
            
            
            }{
                <SearchBar 
                    // todo={todo}
                    placeholder="Enter a Book Name..."
                    data={todos}
                />
                
                    }
              
            <div>
                <Tabs currentTab={currentTab} />

                {
                    // todos.some(todo => todo.done) 
                    (currentTab===DONE_TODOS) ? (
                        <button
                            onClick={removeDoneTodos}
                            className="button clear"
                        >Remove Todos</button>
                    ) : null    
                }
            </div>
            
            <div>
                <ul>   
                {
                    getTodos().map(todo => (
                        <Todo 
                            key={todo._id}
                            todo={todo}
                        />
                    ))
                }
            </ul>
            </div>
        </article>
    )
}

export default Todos;