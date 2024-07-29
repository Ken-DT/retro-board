import React from "react";
import RetrospectiveItem from "./RetrospectiveItem";

const Category = ({
  name,
  items,
  addItem,
  updateItem,
  deleteItem,
  moveItem,
  layout,
}) => {
  const categoryClass = name.toLowerCase().replace(" ", "-");

  return (
    <div className={`category ${categoryClass} ${layout}`}>
      <h2>{name}</h2>
      <button onClick={addItem}>+</button>
      <div className={`items ${layout}`}>
        {items.map((item) => (
          <RetrospectiveItem
            key={item.id}
            item={item}
            updateItem={updateItem}
            deleteItem={deleteItem}
            moveItem={moveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
