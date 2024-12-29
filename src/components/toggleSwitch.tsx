import React from "react";

type ToggleSwitchType = {
  checked: boolean;
  text?: string;
  onText: string;
  offText: string;
  onChange?: Function;
};

export default function ToggleSwitch({
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
          className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      <span
        className={`ms-3 text-sm font-medium ${checked ? "text-indigo-400" : "text-amber-400"}`}>
        {"  "}
        {checked ? (!!onText ? onText : "ON") : !!offText ? offText : "OFF"}
      </span>
    </div>
  );
}
