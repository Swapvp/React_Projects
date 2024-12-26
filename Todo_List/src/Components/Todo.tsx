import React, { useEffect, useState } from "react";
import List from "./List.tsx";
import styles from "./todo.module.scss";

// Define types for Todo item
interface TodoItem {
  value: string;
  id: number;
  isDone: boolean;
}

// Define types for edit information
interface EditInfo {
  id: number;
  value: string;
}

const Todo: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<TodoItem[]>([]);
  const [editInfo, setEditInfo] = useState<EditInfo | null>(null);

  const isInitialRender = React.useRef<boolean>(true);

  useEffect(() => {
    const data = localStorage.getItem("items");
    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (value: string): void => {
    setItems((prevItems) => [
      ...prevItems,
      { value, id: new Date().getTime(), isDone: false },
    ]);
  };

  const updateItem = (newValue: string): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editInfo?.id ? { ...item, value: newValue } : item
      )
    );
    setEditInfo(null);
  };

  const handleCompleteClick = (id: number): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleEditClick = ({ id, value }: TodoItem): void => {
    setValue(value);
    setEditInfo({ id, value });
  };

  const handleDeleteClick = (id: number): void => {
    if (editInfo?.id === id) {
      setValue("");
      setEditInfo(null);
    }
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    if (editInfo) {
      updateItem(value);
    } else {
      addItem(value);
    }
    setValue("");
  };

  const cancelHandler = (): void => {
    setValue("");
    setEditInfo(null);
  };

  return (
    <div className={styles.App}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={value}
          placeholder="Enter your todo"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" disabled={!value}>
          {editInfo ? "Update" : "Submit"}
        </button>
        <button
          type="reset"
          onClick={cancelHandler}
          disabled={!(value || editInfo)}
        >
          Cancel
        </button>
      </form>

      <div className={styles.hint}>
        <i>Double click on todo to toggle completion status</i>
      </div>

      <List
        items={items}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleCompleteClick={handleCompleteClick}
      />
    </div>
  );
};

export default Todo;
