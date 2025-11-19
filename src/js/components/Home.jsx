import React, { useState } from "react";
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    return (
        <div className="container">
            <h1>My To Do List</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <input 
                        type="text" 
                        className="form-control"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (inputValue.trim() !== "") { 
                                    setTodos(todos.concat([inputValue.trim()]));
                                    setInputValue("");
                                }
                            }
                        }}	
                        placeholder="Cosas Por Hacer"
                    /> 
                </li>
                {todos.map((t, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                       {t}{""}
                        <i className="fas fa-trash-alt" 
                            onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}
                        ></i>
                    </li>
                ))}
            </ul>
            <div className="mt-3 text-muted">
                {todos.length} {todos.length === 1 ? 'tarea' : 'tareas'} pendiente(s)
            </div>
        </div>
    );
};

export default Home;