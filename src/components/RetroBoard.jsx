import React, { useState } from "react";
import Category from "./Category";
import LayoutSwitcher from "./LayoutSwitcher";

const RetroBoard = () => {
  const [items, setItems] = useState({
    wentWell: [],
    toImprove: [],
    actionItems: [],
  });

  const [layout, setLayout] = useState("column");

  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === "column" ? "row" : "column"));
  };

  const addItem = (category) => {
    const newItem = { id: Date.now(), text: "" };
    setItems((prevItems) => ({
      ...prevItems,
      [category]: [...prevItems[category], newItem],
    }));
  };

  const updateItem = (id, newText) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      for (const category in updatedItems) {
        updatedItems[category] = updatedItems[category].map((item) =>
          item.id === id ? { ...item, text: newText } : item
        );
      }
      return updatedItems;
    });
  };

  const deleteItem = (id) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      for (const category in updatedItems) {
        updatedItems[category] = updatedItems[category].filter(
          (item) => item.id !== id
        );
      }
      return updatedItems;
    });
  };

  const moveItem = (id, direction) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      let itemToMove = null;
      let fromCategory = "";
      let toCategory = "";

      // Find the item and its category
      for (const category in updatedItems) {
        const index = updatedItems[category].findIndex(
          (item) => item.id === id
        );
        if (index !== -1) {
          itemToMove = updatedItems[category].splice(index, 1)[0];
          fromCategory = category;
          break;
        }
      }

      // Determine the target category based on direction
      if (itemToMove) {
        if (direction === "right") {
          if (fromCategory === "toImprove") toCategory = "wentWell";
          else if (fromCategory === "actionItems") toCategory = "toImprove";
          else toCategory = "actionItems"; // Wrap around to the last category
        } else if (direction === "left") {
          if (fromCategory === "wentWell") toCategory = "toImprove";
          else if (fromCategory === "toImprove") toCategory = "actionItems";
          else toCategory = "wentWell"; // Wrap around to the first category
        }

        // Add the item to the target category
        updatedItems[toCategory].push(itemToMove);
      }

      return updatedItems;
    });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Retro Board</h1>
        <LayoutSwitcher layout={layout} toggleLayout={toggleLayout} />
      </div>
      <div className={`retro-board ${layout}`}>
        <div className="categories">
          <Category
            name="Went Well"
            items={items.wentWell}
            addItem={() => addItem("wentWell")}
            updateItem={updateItem}
            deleteItem={deleteItem}
            moveItem={moveItem}
            layout={layout}
          />
          <Category
            name="To Improve"
            items={items.toImprove}
            addItem={() => addItem("toImprove")}
            updateItem={updateItem}
            deleteItem={deleteItem}
            moveItem={moveItem}
            layout={layout}
          />
          <Category
            name="Action Items"
            items={items.actionItems}
            addItem={() => addItem("actionItems")}
            updateItem={updateItem}
            deleteItem={deleteItem}
            moveItem={moveItem}
            layout={layout}
          />
        </div>
      </div>
    </div>
  );
};

export default RetroBoard;
