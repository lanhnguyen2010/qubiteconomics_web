import { useState } from "react";

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateData }) => {
    const [value, setValue] = useState(initialValue);
  
    const onBlur = () => {
      updateData(index, id, value);
    };
  
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        style={{ width: "100%" }}
      />
    );
  };

export default EditableCell;