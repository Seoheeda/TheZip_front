import React from "react";
import FindHouse from "../components/dormitory/findhouse";
import FindDorm from "../components/dormitory/findDorm";

const Dormitory = () => {
  return (
    <div className="flex flex-col lg:flex-row h-auto px-24 py-28 space-y-10 lg:space-x-10 lg:space-y-0">
      <FindDorm />
      <FindHouse />
    </div>
  );
};

export default Dormitory;
