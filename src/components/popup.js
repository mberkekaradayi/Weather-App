import React from "react";
import "./style.css";

// Popup window component
const Popup = ({ setShowPopup }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Invalid Location</h2>
        <button
          style={{ width: "100px", padding: "10px", marginTop: "10px" }}
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
