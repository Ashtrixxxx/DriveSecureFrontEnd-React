import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const FilterInsurance = ({ list }) => { // Destructured list prop
  const location = useLocation();
  const isUser = location.pathname.includes('/user');
  const [filterStatus, setFilterStatus] = useState(null);
  const nav = useNavigate();

  const onChangeFilter = (event) => {
    const value = parseInt(event.target.value); // Parse the value as a number
    setFilterStatus(value);
if(isUser){
    if (value === 0) {
      nav("/user/FilteredList/0", { state: { list: list } });
    } else if (value === 1) {
      nav("/user/FilteredList/1", { state: { list: list } });
    }else if (value === 2) {
      nav("/user/FilteredList/2", { state: { list: list } });
    }else if (value === 3) {
      nav("/user/FilteredList/3", { state: { list: list } });
    }
    else if (value === 4) {
      nav("/user/FilteredList/4", { state: { list: list } });
    }
    
  }else{
    if (value === 0) {
      nav("/admin/dashboard/AdminFilterList/0", { state: { list: list } });
    } else if (value === 1) {
      nav("/admin/dashboard/AdminFilterList/1", { state: { list: list } });
    }else if (value === 2) {
      nav("/admin/dashboard/AdminFilterList/2", { state: { list: list } });
    }else if (value === 3) {
      nav("/admin/dashboard/AdminFilterList/3", { state: { list: list } });
    }else if (value === 4) {
      nav("/admin/dashboard/AdminFilterList/4", { state: { list: list } });
    }
    
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
        <option value={1}>Under Review</option>
        <option value={2}>Accepted</option>
        <option value={3}>Rejected</option>
        <option value={4}>Accepted and paid</option>

      </select>
    </div>
  );
};
