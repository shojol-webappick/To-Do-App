import React from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DropDown = ({ open, setOpen, value, setValue, items, setItems, placeholder }) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      translation={{
        PLACEHOLDER: placeholder,
      }}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

export default DropDown;
