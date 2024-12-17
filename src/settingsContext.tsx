import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import Settings from "./settings";

const __DEV__ = true;

interface SettingsContextType {
  settings: Settings;
  setSettings(settings: Settings): Promise<void>;
  resetZmanimToShowSettings(): Promise<void>;
}

const initialSettings = new Settings();
const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  setSettings: async (_: Settings) => {},
  resetZmanimToShowSettings: async () => {},
});

export const SettingsProvider = (props: PropsWithChildren) => {
  const [settings, setStateSettings] = useState<Settings>(new Settings());

  useEffect(() => {
    const s = localStorage.getItem("Settings");
    if (s) {
      const sObj = JSON.parse(s);
      setStateSettings(sObj);
      __DEV__ && console.log("get local storage settings", sObj);
    }
  }, []);

  useEffect(() => {
    const applyTheme = (theme: string) => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        document.documentElement.setAttribute("data-theme", systemTheme);
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
    };

    applyTheme(settings.theme);
  }, [settings.theme]);

  const setSettings = async (s: Settings) => {
    const sStr = JSON.stringify(s);
    localStorage.setItem("Settings", sStr);
    setStateSettings(s);
    __DEV__ && console.log("set localstorage settings", s);
  };

  const resetZmanimToShowSettings = async () => {
    const ns = new Settings();
    const newSettings = { ...settings, zmanimToShow: ns.zmanimToShow } as Settings;    
    localStorage.removeItem("Settings");
    await setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        resetZmanimToShowSettings,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsData = () => useContext(SettingsContext);
