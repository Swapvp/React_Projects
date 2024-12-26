import React from "react";
import styles from "./todo.module.scss";

// Define types for Todo item
interface TodoItem {
  value: string;
  id: number;
  isDone: boolean;
}

// Define types for the component props
interface ListProps {
  items: TodoItem[];
  handleEditClick: (item: TodoItem) => void;
  handleDeleteClick: (id: number) => void;
  handleCompleteClick: (id: number) => void;
}

const List: React.FC<ListProps> = ({
  items,
  handleEditClick,
  handleDeleteClick,
  handleCompleteClick,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <li
          className={styles.item}
          key={item.id}
          title="Double click to mark completed"
          onDoubleClick={() => handleCompleteClick(item.id)}
        >
          <span className={item.isDone ? styles.completed : ""}>{item.value}</span>
          <div>
            <button
              className={styles.editBtn}
              onClick={() => handleEditClick(item)}
            >
              Edit
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDeleteClick(item.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
