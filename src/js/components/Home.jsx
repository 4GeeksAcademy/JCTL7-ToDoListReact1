import React, { useState } from "react";
import { useEffect } from "react";
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    useEffect(function () {
        fetch('https://playground.4geeks.com/todo/users/JCTL7')
            .then(resp => resp.json()
            )
            .then(data => {
                setTodos(data.todos);
            })
            .catch(error => {
                console.log(error);
            });
    }, []
    );

    const saveTodos = (newTodos) => {
        fetch('https://playground.4geeks.com/todo/todos/JCTL7', {
            method: 'POST',
            body: JSON.stringify({
                label: newTodos,
                is_done: false,
            }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setTodos([...todos, data]);
            })
            .catch(error => {

                console.log(error);
            });
    }
    function deleteTodos(id) {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                if (resp.json) {
                    setTodos(todos.filter(t => t.id !== id));
                }
                return resp;
            })
            .catch(error => {
                console.log(error);
            });

    }

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
                                    saveTodos(inputValue.trim());
                                    setInputValue("");
                                };
                            }
                        }}
                        placeholder="Cosas Por Hacer"
                    />
                </li>
                {todos.map((t, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        {t.label}{""}
                        <i
                            className="fas fa-trash-alt"
                            onClick={() => deleteTodos(t.id)}
                            style={{ cursor: "pointer" }}
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