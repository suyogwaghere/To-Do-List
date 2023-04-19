import { useState } from "react";
import { useDispatch} from "react-redux";
import { addNewTodo } from "../redux/actions";

const ToDoForm = () => {

    const [text, setText] = useState("");

    const dispatch = useDispatch();
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewTodo(text));

        setText('');
    };
    
    const onClick = (e) => {
        e.preventDefault();
        dispatch(addNewTodo(text));

        setText('');
    };

    const onInputChange = (e) => {
        setText(e.target.value);
    }; 

    return (
        <form className='form' action="" onSubmit={onFormSubmit}> 
            <input type="text" value={text} placeholder="Enter the task.." className="inputTodo" onChange={onInputChange}/>
            <button className="inputButton" onClick={onClick}> 
             Add   
            </button>
        </form>
        
    )
};

export default ToDoForm;