import React, { useState } from "react";
import DropDown from "./DropDown";

const PriorityField = ({ priority, setPriority }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "First", value: "first" },
    { label: "Second", value: "second" },
    { label: "Third", value: "third" },
  ]);

  return (
    <DropDown
      placeholder="Select an To-Do Priority"
      open={open}
      items={items}
      value={priority}
      setOpen={setOpen}
      setValue={setPriority}
      setItems={setItems}
    />
  );
};

export default PriorityField;
