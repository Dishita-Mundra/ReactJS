import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

function Todos() {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleSave = (id) => {
        if (!editText.trim()) return;

        dispatch(
            updateTodo({
                id: id,
                text: editText,
            })
        );

        setEditId(null);
        setEditText("");
    };

    return (
        <>
            <div className="text-xl font-semibold mb-3">Todos</div>

            <ul className="list-none">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                    >
                        {editId === todo.id ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full mr-4 px-3 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        ) : (
                            <div className="text-white">{todo.text}</div>
                        )}

                        <div className="flex gap-2">

                            {editId === todo.id ? (
                                <button
                                    onClick={() => handleSave(todo.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setEditId(todo.id);
                                        setEditText(todo.text);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="text-white bg-red-500 border-0 py-1 px-4 hover:bg-red-600 rounded"
                            >
                                Delete
                            </button>

                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos;