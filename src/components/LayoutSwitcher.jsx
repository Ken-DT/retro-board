import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faBars } from "@fortawesome/free-solid-svg-icons";

const LayoutSwitcher = ({ layout, toggleLayout }) => {
  return (
    <button onClick={toggleLayout} className="layout-switcher">
      {layout === "row" ? (
        <FontAwesomeIcon icon={faBars} />
      ) : (
        <FontAwesomeIcon icon={faColumns} />
      )}
    </button>
  );
};

export default LayoutSwitcher;
