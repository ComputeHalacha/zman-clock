import React from "react";

type ToggleSwitchType = {
  theme?: "light" | "dark";
  checked: boolean;
  text?: string;
  onText: string;
  offText: string;
  onChange?: Function;
};

export default function ToggleSwitch({
  theme,
  checked,
  text,
  onText,
  offText,
  onChange,
}: ToggleSwitchType) {
  const toggleChecked = () => {
    const newVal = !checked;
    if (onChange) {
      onChange(newVal);
    }
  };
  return (
    <div
      className="flex flex-row justify-between items-center w-full"
      onClick={(e) => e.stopPropagation()}>
      <div className="standard-text-color">{text}</div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={toggleChecked}
          checked={checked}
        />
        <div
          style={{ direction: "ltr" }}
          className={`w-11 h-6 rounded-full peer peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
            theme === "dark"
              ? "bg-gray-200 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:border-white after:bg-white after:border-gray-300 dark:border-gray-600 peer-checked:bg-blue-600"
              : "bg-gray-700 peer-focus:ring-blue-100 dark:peer-focus:ring-yellow-500 dark:bg-gray-400 peer-checked:after:border-white after:bg-white after:border-gray-300 dark:border-gray-400 peer-checked:bg-yellow-600"
          }`}></div>
      </label>
      <span
        className={`ms-3 text-sm font-medium ${
          checked ? "text-indigo-400" : "selected-text-color"
        }`}>
        {"  "}
        {checked ? (!!onText ? onText : "ON") : !!offText ? offText : "OFF"}
      </span>
    </div>
  );
}
