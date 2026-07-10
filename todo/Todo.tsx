import { FormEvent, useState } from 'react';

type Todo = {
    id: number;
    text: string;
    done: boolean;
};

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const text = input.trim();
        if (!text) return;

        setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
        setInput('');
    };

    const handleDone = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return (
        <main>
            <section className="todo-section">
                <h1>To-Do List</h1>

                <form className="todo-form" onSubmit={handleSubmit}>
                    <input
                        className="todo-input"
                        type="text"
                        placeholder="할 일을 입력하세요"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="todo-add-button" type="submit">
                        추가
                    </button>
                </form>

                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className="todo-item" data-id={todo.id}>
                            <p>{todo.text}</p>
                            <button
                                type="button"
                                className="todo-done-button"
                                onClick={() => handleDone(todo.id)}
                            >
                                완료
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
