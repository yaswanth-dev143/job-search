import React from "react";

const InputForm = (htmlFor, labeltext, type, name, value, handleChange) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className="text-sm mb-2">
        {labeltext}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputForm;