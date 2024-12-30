import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import Settings, { isItCurrentlyNightTime } from "./settings";

const __DEV__ = true;

interface SettingsContextType {
  settings: Settings;
  setSettings(settings: Settings): Promise<void>;
  resetZmanimToShowSettings(): Promise<void>;
  getCurrentTheme: () => "light" | "dark";
}

const getCurrentTheme = () =>
  (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";

const setCurrentTheme = (theme: "light" | "dark") =>
  document.documentElement.setAttribute("data-theme", theme);

const initialSettings = new Settings();
const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  setSettings: async (_: Settings) => {},
  resetZmanimToShowSettings: async () => {},
  getCurrentTheme,
});

export const SettingsProvider = (props: PropsWithChildren) => {
  const [settings, setStateSettings] = useState<Settings>(new Settings());

  useEffect(() => {
    const s = localStorage.getItem("Settings");
    if (s) {
      const settingsFromStorage = JSON.parse(s) as Settings;
      setStateSettings(settingsFromStorage);
      __DEV__ && console.log("get local storage settings", settingsFromStorage);
    }
  }, []);

  useEffect(() => {    
    applyColorTheme()    
  }, [settings.autoTheme, settings.location, settings.theme]);

  const setSettings = async (s: Settings) => {
    const sStr = JSON.stringify(s);
    localStorage.setItem("Settings", sStr);
    setStateSettings(s);
    __DEV__ && console.log("set localstorage settings", s);
  };

  const applyColorTheme = async () => {
    const current = getCurrentTheme();
    if (settings?.autoTheme) {
      const correctAutoTheme = isItCurrentlyNightTime(settings.location) ? "dark" : "light";
      if (settings.theme !== correctAutoTheme) {
        await setSettings({ ...settings, theme: correctAutoTheme });
      }
      if (current !== correctAutoTheme) {
        setCurrentTheme(correctAutoTheme);
      }
    } else {
      if (settings.theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        if (current !== systemTheme) {
          setCurrentTheme(systemTheme);
        }
      } else if (current !== settings.theme) {
        setCurrentTheme(settings.theme as "light" | "dark");
      }
    }
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
        getCurrentTheme,
        resetZmanimToShowSettings,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsData = () => useContext(SettingsContext);
