import { useContext, useState } from "react";
import "./Todo.css";
import TodoAdd from "./TodoAdd";
import TodoItem from "./TodoItem";
import DetailContext from "../context";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  let context = useContext(DetailContext);
  const [todoItems, setTodoItems] = useState(context.todoList);
  const [todoItemsCopy, setTodoItemsCopy] = useState(todoItems);

  const completeTodoItem = (id) => {
    const todoItem = todoItems.map((item) =>
      item.id === id ? { ...item, complete: !item.complete } : item
    );
    setTodoItems(todoItem);
  };

  const deleteTodoItem = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  const updateTodoItem = (todoItem) => {
    let updatedTodo = prompt("Please update todo item", todoItem.todo);
    if (updatedTodo != null) {
      const todoItemList = todoItems.map((item) =>
        item === todoItem ? { ...item, todo: updatedTodo } : item
      );
      setTodoItems(todoItemList);
    }
  };

  const searchTodoItem = (event) => {
    const todoSearched = todoItemsCopy.filter((item) =>
      item.todo.toLowerCase().includes(event.target.value)
    );
    setTodoItems(todoSearched);
  };

  const addTodoItem = (event, newTodo) => {
    event.preventDefault();
    const newList = [...todoItems, { id: 555, todo: newTodo, complete: false }];
    setTodoItems(newList);
  };

  // const viewDetail = (id) => {
  //   navigate("7detail/"+id)
  // }
  return (
    <>
      <header className="text-center text-light my-4">
        <h1 className="mb-5">Todo List</h1>
        <input
          type="text"
          className="form-control m-auto"
          name="search"
          placeholder="search todos"
          onChange={(event) => searchTodoItem(event)}
        />
      </header>

      {todoItems.map((i) => (
        <TodoItem
          key={i.id}
          item={i}
          completeTodoItem={completeTodoItem}
          deleteTodoItem={deleteTodoItem}
          updateTodoItem={updateTodoItem}
        />
      ))}
      <TodoAdd addTodoItem={addTodoItem} />
    </>
  );
};
export default Todo;