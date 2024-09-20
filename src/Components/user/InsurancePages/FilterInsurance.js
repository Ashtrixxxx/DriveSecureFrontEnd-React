import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FilterInsurance = ({ list }) => { // Destructured list prop
    
  const [filterStatus, setFilterStatus] = useState(null);
  const nav = useNavigate();

  const onChangeFilter = (event) => {
    const value = parseInt(event.target.value); // Parse the value as a number
    setFilterStatus(value);

    if (value === 0) {
      nav("/user/FilteredList/0", { state: { list: list } });
    } else if (value === 1) {
      nav("/user/FilteredList/1", { state: { list: list } });
    }
  };

  return (
    <div>
      <select
        onChange={(event) => onChangeFilter(event)}
        value={filterStatus || ""}
      >
        <option value="" disabled>Select Status</option>
        <option value={0}>Pending</option>
        <option value={1}>Accepted</option>
      </select>
    </div>
  );
};
