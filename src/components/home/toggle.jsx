import React from "react";

const Toggle = ({ options, value, onChange }) => {
  return (
    <div className="mt-6">
      <div className="flex text-lg font-medium text-gray-600 mb-3">매물 종류</div>
      <div className="mt-2 flex text-sm xl:text-lg space-x-2">
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={`py-2 px-4 rounded-md border w-1/3 ${
              options[value] === option
                ? "ring-2 ring-primary"
                : "bg-white text-gray-600 border-gray-300"
            }`}
            onClick={() => onChange(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toggle;
