import React, { useState } from "react";
const axios = require("axios");

const initialColor = {
  color: "",
  code: { hex: "" }
};
const ColorList = ({ colors, updateColors,storage }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorName,setColorName] = useState('')
  const [colorCode, setColorCode] = useState("");
  const key = storage;
const header = {
  headers: { authorization: key }
};
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/colors/${colorToEdit.id}`,colorToEdit,header);
    updateColors()
    setEditing(false)
  };

  const deleteColor = async color => {
    await axios.delete(`http://localhost:5000/api/colors/${color.id}`,header)
    updateColors()
  };

  const newColor = async e => {
    e.preventDefault();
    const myColor = {
      color:colorName,
      code:{hex:colorCode}
    }
    await axios.post("http://localhost:5000/api/colors/",myColor,header);
    setColorCode('')
    setColorName('')
    updateColors()
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div />
      <form onSubmit={newColor} style={{justifyItems:'center'}}>
        <input
          placeholder="Enter Color Name"
          value={colorName}
          onChange={here => setColorName(here.target.value)}
          required
          style={{ width: "75%"}}
        />
        <input
          placeholder="Enter Color Code"
          value={colorCode}
          onChange={here => setColorCode(here.target.value)}
          style={{ width: "75%"}}
          required
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default ColorList;
