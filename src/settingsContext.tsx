import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import Settings from "./settings";
import { jDate, Location, Utils, Zmanim } from "jcal-zmanim";

const __DEV__ = true;

interface SettingsContextType {
  settings: Settings;
  setSettings(settings: Settings): Promise<void>;
  resetZmanimToShowSettings(): Promise<void>;
  isItCurrentlyNightTime(location: Location): boolean;
}

const initialSettings = new Settings();
const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  setSettings: async (_: Settings) => {},
  resetZmanimToShowSettings: async () => {},
  isItCurrentlyNightTime: (_: Location): boolean => false,
});

export const SettingsProvider = (props: PropsWithChildren) => {
  const [settings, setStateSettings] = useState<Settings>(new Settings());

  useEffect(() => {
    const s = localStorage.getItem("Settings");
    if (s) {
      const settingsFromStorage = JSON.parse(s);
      if (settingsFromStorage.autoTheme) {
        settingsFromStorage.theme = (isItCurrentlyNightTime(settingsFromStorage.location) ? "dark" : "light");
      }
      setStateSettings(settingsFromStorage);
      __DEV__ && console.log("get local storage settings", settingsFromStorage);
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
  const isItCurrentlyNightTime = (location: Location) => {
    const sd = new Date(),
      nowTime = Utils.timeFromDate(sd),
      { sunset, sunrise } = Zmanim.getSunTimes(sd, location),
      isBeforeAlos = Utils.isTimeAfter(nowTime, sunrise),
      isAfterShkia = Utils.isTimeAfter(sunset, nowTime),
      isNight = isBeforeAlos || isAfterShkia;
    return isNight;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        resetZmanimToShowSettings,
        isItCurrentlyNightTime,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsData = () => useContext(SettingsContext);
