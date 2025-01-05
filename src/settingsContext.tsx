import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import Settings from "./settings";
import { Utils, Zmanim, Location } from "jcal-zmanim";

const __DEV__ = import.meta.env.DEV;

interface SettingsContextType {
  settings: Settings;
  setSettings(settings: Settings): Promise<void>;
  resetZmanimToShowSettings(): Promise<void>;
  getCurrentTheme: () => "light" | "dark" | undefined;
  applyColorTheme: (isNight?: boolean) => Promise<void>;
}

/**
 * @returns The current theme of the app
 */
const getCurrentTheme = () =>
  document.documentElement.getAttribute("data-theme") as "light" | "dark" | undefined;

/**
 * @param {"light" | "dark"} theme 
 * @returns Sets the current theme of the app
 */
const setCurrentTheme = (theme: "light" | "dark") =>
  document.documentElement.setAttribute("data-theme", theme);

/**
 * @param {Location} location
 * @returns Determines  whether or not it is night time right now at the given location
 */
const isItCurrentlyNightTime = (location: Location) => {
  let isNight = false;
  const sd = new Date(),
    nowTime = Utils.timeFromDate(sd),
    { sunset, sunrise } = Zmanim.getSunTimes(sd, location);
  if (sunrise && sunset) {
    const isBeforeAlos = Utils.isTimeAfter(nowTime, sunrise),
      isAfterShkia = Utils.isTimeAfter(sunset, nowTime);
    isNight = isBeforeAlos || isAfterShkia;
  } else {
    isNight = nowTime.hour > 18 || nowTime.hour < 6;
  }
  return isNight;
}

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
    __DEV__ && console.log("settingsContext.tsx-setSettings(settings)", s);
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
        __DEV__ && console.log("settingsContext.tsx-applyColorTheme(isNight)", isNight);
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
    __DEV__ && console.log("settingsContext.tsx-resetZmanimToShowSettings()");
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
