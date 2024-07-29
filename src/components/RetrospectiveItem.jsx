import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const RetrospectiveItem = ({ item, updateItem, deleteItem, moveItem }) => {
  const [text, setText] = useState(item.text);

  const handleTextChange = (e) => {
    setText(e.target.value);
    updateItem(item.id, e.target.value);
  };

  return (
    <div className="retrospective-item">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
      />
      <div className="item-controls">
        <button onClick={() => moveItem(item.id, "left")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={() => deleteItem(item.id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button onClick={() => moveItem(item.id, "right")}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default RetrospectiveItem;
