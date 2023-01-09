import React from "react";

function TimeandOptions() {
  // Current Date

  const showTime = new Date().toDateString();

  return (
    <div className="flex justify-between flex-col sm:flex-row items-center sm:items-end mt-5 sm:mt-0">
      <div className="hidden sm:flex">
        <h4 className="sm:ml-[38px] text-lg bg-[#E7B853] rounded-sm px-6 py-2 max-w-max font-medium closed dark:bg-[#0F0C29] dark:text-white dark:border-[#2926A7] dark:border-2">
          {showTime}
        </h4>
      </div>

      <div className="sm:mr-[38px] flex gap-5 select  dark:border-[#2926A7] dark:border-2">
        <select
          name="todoSort"
          id="sort"
          className="dark:bg-[#0F0C29] dark:text-white"
        >
          <option className="optionone dark:bg-[#060917]" value="0">
            Sort
          </option>
          <option value="1" className="dark:bg-[#060917]">
            Name
          </option>
          <option value="2" className="dark:bg-[#060917]">
            Time
          </option>
          <option value="3" className="dark:bg-[#060917]">
            Modification Time
          </option>
        </select>
      </div>
    </div>
  );
}

export default TimeandOptions;
