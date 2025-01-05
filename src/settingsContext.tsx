import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import Settings, { isItCurrentlyNightTime } from "./settings";

const __DEV__ = import.meta.env.DEV;

interface SettingsContextType {
  settings: Settings;
  setSettings(settings: Settings): Promise<void>;
  resetZmanimToShowSettings(): Promise<void>;
  getCurrentTheme: () => "light" | "dark" | undefined;
  applyColorTheme: (isNight?: boolean) => Promise<void>;
}

const getCurrentTheme = () =>
  document.documentElement.getAttribute("data-theme") as "light" | "dark" | undefined;

const setCurrentTheme = (theme: "light" | "dark") =>
  document.documentElement.setAttribute("data-theme", theme);

let initialSettings: Settings;

const storageSettings = localStorage.getItem("Settings");
if (storageSettings) {
  initialSettings = JSON.parse(storageSettings);
} else {
  initialSettings = new Settings();
}

const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  setSettings: async (_: Settings) => {},
  resetZmanimToShowSettings: async () => {},
  getCurrentTheme,
  applyColorTheme: async () => {},
});

export const SettingsProvider = (props: PropsWithChildren) => {
  const [settings, setStateSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    applyColorTheme();
  }, [settings.autoTheme, settings.location, settings.theme]);

  const setSettings = async (s: Settings) => {
    const sStr = JSON.stringify(s);
    localStorage.setItem("Settings", sStr);
    setStateSettings(s);
    __DEV__ && console.log("set localstorage settings", s);
  };

  const applyColorTheme = async (isNight?: boolean) => {
    const current = getCurrentTheme();
    if (settings?.autoTheme) {
      let correctAutoTheme: "light" | "dark";
      if (typeof isNight === "boolean") {
        correctAutoTheme = isNight ? "dark" : "light";
      } else {
        correctAutoTheme = isItCurrentlyNightTime(settings.location) ? "dark" : "light";
      }
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
        applyColorTheme,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsData = () => useContext(SettingsContext);
