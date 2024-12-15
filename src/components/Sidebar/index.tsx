import React from "react";
import { useSettingsData } from "../../settingsContext";
import { ZmanTypes } from "jcal-zmanim";
import CloseButton from "../CloseButton";
import "./index.tsx.scss";

type SideBarProps = {
  isOpen: boolean;
  setIsOpen: Function;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};
export default function Sidebar({ isOpen, setIsOpen, onDrop }: SideBarProps) {
  const { settings, setSettings } = useSettingsData();
  const { english } = settings;

  return (
    isOpen && (
      <div
        className="sidebar transform ease-in-out"
        onDragEnter={(ev) => ev.preventDefault()}
        onDragOver={(ev) => ev.preventDefault()}
        onDrop={(ev) => onDrop(ev)}
        onClick={() => setIsOpen(false)}>
        <CloseButton className="sidebar-close-button" onClick={() => setIsOpen(false)} />
        <div className="sidebar-header">
          <h2 className="text-xl font-bold">{english ? "Add/Remove Zmanim" : "הוסף/הסר זמנים"}</h2>
          {english ? (
            <>
              Drag Zmanim out to add them to shown list.
              <br />
              Drag Zmanim in to remove them.
            </>
          ) : (
            <>
              גרור את זמנים החוצה כדי להוסיף אותם לרשימה המוצגת.
              <br />
              גרור זמנים פנימה כדי להסיר אותם.
            </>
          )}
        </div>
        <div className="sidebar-zmanim-list">
          {ZmanTypes.filter((zt) => !settings.zmanimToShow.find((zts) => zts.id === zt.id)).map(
            (zt) => (
              <div
                className="sidebar-single-item pt-3 pb-3 p-4 mb-2 text-gray-500 bg-[#272727] rounded-lg"
                key={zt.id}
                draggable={true}
                onDragStart={(e) => e.dataTransfer.setData("ZmanTypeToShow", zt.id.toString())}>
                <div>{english ? zt.eng : zt.heb}</div>
              </div>
            )
          )}
        </div>
      </div>
    )
  );
}
