import { useState } from "react";

const ToDoForm = () => {

    const [text, setText] = useState("");
    
    const onFormSubmit = () => {
    };  

    const onInputChange = (e) => {
        setText(e.target.value);
    }; 

    return (
        <form class='form' action="" onSubmit={onFormSubmit}> 
            <input type="text" placeholder="Enter the task.." className="input" onChange={onInputChange}/>

        </form>
    )
};

export default ToDoForm;