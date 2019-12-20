import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
const axios = require("axios");
const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const key = window.localStorage.getItem("key");
  const getColors = async () => {
      const header = {
        headers: { authorization: key }
      }
      const res = await axios("http://localhost:5000/api/colors",header);
      setColorList(res.data)
    };
  useEffect(() => {
    getColors()
  },[]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
