import React, { useState, useEffect } from "react";
import { useSettingsData } from "../../settingsContext";
import { Time, Utils, ZmanTime, ZmanTypes } from "jcal-zmanim";
import CloseButton from "../CloseButton";
import "./index.tsx.css";

type SideBarProps = {
  isOpen: boolean;
  setIsOpen: Function;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};
export default function Sidebar({ isOpen, setIsOpen, onDrop }: SideBarProps) {
  const { settings, setSettings } = useSettingsData();
  const { english } = settings;

  return ( isOpen &&
    <div className="sidebar" onDragOver={(ev) => ev.preventDefault()} onDrop={(ev) => onDrop(ev)}>
      <CloseButton className="sidebar-close-button" onClick={() => setIsOpen(false)} />
      {ZmanTypes.filter((zt) => !settings.zmanimToShow.find((zts) => zts.id === zt.id)).map(
        (zt) => (
          <div
            className="pt-3 pb-3 p-4 mb-2 text-gray-500 bg-[#272727] rounded-lg"
            key={zt.id}
            draggable={true}
            onDragStart={(e) => e.dataTransfer.setData("ZmanTypeToShow", zt.id.toString())}>
            <div>{english ? zt.eng : zt.heb}</div>
          </div>
        )
      )}
    </div>
  );
}
