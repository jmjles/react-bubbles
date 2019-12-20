import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
const axios = require("axios");
const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  const key = props.storage

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
      <button
        onClick={()=>{window.localStorage.removeItem("key")
      props.setStorage(window.localStorage.getItem('key'))}}
        style={{ top: "25px", right: "30px", position: "absolute" }}
      >
        Log Out
      </button>
      <ColorList colors={colorList} updateColors={getColors} storage ={props.storage}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
