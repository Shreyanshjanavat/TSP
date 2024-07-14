import React from "react";
import { Link } from "react-router-dom";

const Box = ({ className, index, to }) => {
  // Render a `div` element with some styles applied to it
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div
        style={{
          width: "100px",
          height: "100px",
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginLeft: "30px",
          gap: "40px",
          backgroundColor: "voilet",
        }}
      >
        {/* Use the `className` prop as the text content of the `div` */}
        {className}
      </div>
    </Link>
  );
};

export default Box;