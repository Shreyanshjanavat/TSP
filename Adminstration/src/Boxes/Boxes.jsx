import React, { useState } from "react";
import Box from "./Box";
import { createContext } from "react";
import { Link } from "react-router-dom";

export const Indexnumber = createContext(null);

const Boxes = () => {
  const classes = Array.from({ length: 11 }, (_, i) => `class${i }`);
  const [clicked, setClicked] = useState(null);

  const handleclick = (index) => {
    setClicked(index);
    console.log(index);
  };

  const contextValue = { clicked };

  return (
    <Indexnumber.Provider value={contextValue}>
      <div style={{ display: "flex", flexWrap: "wrap", cursor: "pointer" }}>
        {classes.map((className, index) => (
          <Box
            key={className}
            className={className}
            index={index}
            to={`/showstudent/${index}`}
            onClick={()=>handleclick(index)}
          />
        ))}
      </div>
    </Indexnumber.Provider>
  );
};

export default Boxes;