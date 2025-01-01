import { useState, useEffect } from "react";
import { useSettingsData } from "../../settingsContext";
import { Location, ZmanToShow, ZmanTypes } from "jcal-zmanim";
import ToggleSwitch from "../toggleSwitch";
import Settings from "../../settings";
import LocationChooser from "../LocationChooser";
import CloseButton from "../CloseButton";
import { version } from "../../../package.json";
import "./index.tsx.scss";

interface SettingsChooserProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onChangeSettings: () => any;
  onClose: Function;
  showLocation: boolean;
}

export default function SettingsChooser({
  isOpen,
  setIsOpen,
  onChangeSettings,
  onClose,
  showLocation,
}: SettingsChooserProps) {
  const { settings, setSettings, resetZmanimToShowSettings, getCurrentTheme } = useSettingsData();
  const [showLocationChooser, setShowLocationChooser] = useState(showLocation);
  const eng = settings.english;

  useEffect(() => setShowLocationChooser(showLocation), [showLocation]);

  function changeSetting(settingToChange: object) {
    setSettings({ ...settings, ...settingToChange } as Settings);
    onChangeSettings();
  }

  function changeZmanToShowList(zt: ZmanToShow, checked: boolean) {
    let list: ZmanToShow[] = [...settings.zmanimToShow];
    const listHasThis = !!list.find((zts) => zts.id === zt.id);
    if (checked && !listHasThis) {
      list.push(zt);
    } else if (!checked && listHasThis) {
      list = list.filter((zts) => zts.id !== zt.id);
    }
    changeSetting({ zmanimToShow: list });
  }

  function changeLocation(location: Location) {
    if (!!location) {
      changeSetting({ location: location });
      setShowLocationChooser(false);
    }
  }

  return (
    <main
      className={
        "fixed top-0 left-0 h-full z-10 bg-[#44444465] bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0  "
          : "transition-all delay-500 opacity-0 -translate-x-full  ")
      }>
      <section
        className={
          "drawer-background-color left-0 absolute border border-zinc-800 rounded-r shadow h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? "translate-x-0 " : " -translate-x-full ")
        }>
        <article className="relative border border-zinc-800 rounded-r shadow pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <main className="settings-chooser" style={{ direction: "ltr" }} onClick={() => onClose()}>
            {showLocationChooser ? (
              <section className="h-full w-full">
                <LocationChooser
                  location={settings.location}
                  onChangeLocation={(location: Location) => {
                    changeLocation(location);
                    if (showLocation) {
                      onClose();
                    }
                  }}
                  eng={eng}
                  onClose={() => {
                    setShowLocationChooser(false);
                    if (showLocation) {
                      onClose();
                    }
                  }}
                />
              </section>
            ) : (
              <>
                <section>
                  <article className="flex justify-between flex-row align-top p-2">
                    <a
                      onClick={(e) => {
                        e.stopPropagation();
                        resetZmanimToShowSettings();
                      }}
                      className="settings-reset-color cursor-pointer text-xs">
                      {eng ? "Reset" : "איפוס"}
                    </a>
                    <div className="settings-version-color text-xs">
                      Zman Clock Version {version}
                    </div>
                    <CloseButton onClick={() => onClose()} />
                  </article>
                  <header className="settings-header-color pb-2 font-bold text-3xl flex-1 text-center">
                    {eng ? "Settings" : "הגדרות"}
                  </header>
                </section>
                <section
                  className="h-full settings-chooser"
                  style={{ direction: eng ? "ltr" : "rtl" }}>
                  <div className="settings-background flex flex-row justify-between items-center px-4 py-2 mb-1.5">
                    <div className="standard-text-color">{eng ? "Language" : "שפה"}</div>
                    <div className="flex">
                      <div className="flex items-center px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          id="horizontal-list-eng"
                          type="radio"
                          checked={eng}
                          name="list-radio"
                          onChange={(event) => changeSetting({ english: event.target.checked })}
                          className="w-4 h-4 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label
                          htmlFor="horizontal-list-eng"
                          className={`w-full py-3 ms-2 text-sm font-medium ${
                            eng ? "selected-text-color" : "unselected-text-color"
                          }`}>
                          English
                        </label>
                      </div>
                      <div className="flex items-center px-3">
                        <input
                          id="horizontal-list-heb"
                          type="radio"
                          checked={!eng}
                          name="list-radio"
                          onChange={(event) => changeSetting({ english: !event.target.checked })}
                          className="w-4 h-4 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label
                          htmlFor="horizontal-list-heb"
                          className={`w-full py-3 ms-2 text-sm font-medium ${
                            eng ? "unselected-text-color" : "selected-text-color"
                          }`}>
                          עברית
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="settings-background flex flex-row justify-between items-center px-4 py-2 mb-1.5">
                    <div className="standard-text-color">{eng ? "Location" : "מיקום"}</div>
                    <div className="selected-text-color">
                      {eng
                        ? settings.location.Name
                        : settings.location.NameHebrew || settings.location.Name}
                    </div>
                    <div
                      className="ms-3 text-sm font-medium unselected-text-color cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLocationChooser(true);
                      }}>
                      {eng ? "Change" : "שנה"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <div className="settings-background px-4 py-2 mb-1.5 w-full">
                      <ToggleSwitch
                        theme={getCurrentTheme()}
                        text={eng ? "Show Notifications" : "הצג הודעות"}
                        onText={eng ? "Showing" : "מציג"}
                        offText={eng ? "Not Showing" : "לא מציג"}
                        checked={settings.showNotifications}
                        onChange={(checked: boolean) =>
                          changeSetting({ showNotifications: checked })
                        }
                      />
                    </div>
                    <div className="settings-background px-4 py-1 mb-1.5 w-full">
                      <ToggleSwitch
                        theme={getCurrentTheme()}
                        text={eng ? "Show Daf Yomi" : "הצג דף היומי"}
                        onText={eng ? "Showing" : "מציג"}
                        offText={eng ? "Not Showing" : "לא מציג"}
                        checked={settings.showDafYomi}
                        onChange={(checked: boolean) => changeSetting({ showDafYomi: checked })}
                      />
                    </div>
                    <div className="settings-background px-4 py-1 mb-1.5 w-full">
                      <ToggleSwitch
                        theme={getCurrentTheme()}
                        text={eng ? "24 Hour [army] Clock" : "שעון 24 שעות"}
                        onText={eng ? "Showing" : "מציג"}
                        offText={eng ? "Not Showing" : "לא מציג"}
                        checked={settings.armyTime}
                        onChange={(checked: boolean) => changeSetting({ armyTime: checked })}
                      />
                    </div>
                  </div>
                  <div className="standard-text-color settings-background flex flex-col items-start px-4 py-1 mb-1.5">
                    <ToggleSwitch
                      theme={getCurrentTheme()}
                      text={eng ? 'Show Shir-Shel-Yom of Gr"a' : 'הצג שיר של יום של הגר"א'}
                      onText={eng ? "Showing" : "מציג"}
                      offText={eng ? "Not Showing" : "לא מציג"}
                      checked={settings.showGaonShir}
                      onChange={(checked: boolean) => changeSetting({ showGaonShir: checked })}
                    />
                  </div>
                  <div className="settings-background flex flex-row justify-between items-center px-4 py-1 mb-1.5">
                    <div className="standard-text-color">
                      {eng ? "Minutes to show past Zmanim" : "דקות להציג זמנים שעברו"}
                    </div>
                    <input
                      type="number"
                      value={settings.minToShowPassedZman}
                      className="selected-text-color input-background-color w-1/5 rounded text-center"
                      onChange={(e) =>
                        changeSetting({ minToShowPassedZman: parseInt(e.target.value) })
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="settings-background flex flex-row justify-between items-center px-4 py-1 mb-1.5">
                    <div className="standard-text-color">
                      {eng ? "Number of Zmanim to Show" : "מספר זמנים להציג"}
                    </div>
                    <input
                      type="number"
                      value={settings.numberOfItemsToShow}
                      className="selected-text-color input-background-color w-1/5 rounded text-center"
                      onChange={(e) =>
                        changeSetting({ numberOfItemsToShow: parseInt(e.target.value) })
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="standard-text-color settings-background flex flex-col items-start px-4 py-1 mb-1.5">
                    <ToggleSwitch
                      theme={getCurrentTheme()}
                      text={eng ? "Automatic Color Scheme" : "ערכת צבעים אוטומטי"}
                      onText={eng ? "Auto" : "אוטומטי"}
                      offText={eng ? "Manual" : "ידני"}
                      checked={settings.autoTheme}
                      onChange={(checked: boolean) => changeSetting({ autoTheme: checked })}
                    />
                  </div>
                  {!settings.autoTheme && (
                    <div className="settings-background flex flex-row justify-between items-center px-4 py-1 mb-1.5">
                      <div className="standard-text-color">
                        {eng ? "Color Scheme" : "ערכת צבעים"}
                      </div>
                      <div className="flex">
                        <div
                          className="flex items-center px-3"
                          onClick={(e) => e.stopPropagation()}>
                          <input
                            id="theme-system"
                            type="radio"
                            checked={settings.theme === "system"}
                            name="theme-radio"
                            onChange={(event) => changeSetting({ theme: "system" })}
                            className="w-4 h-4 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <label
                            htmlFor="theme-system"
                            className={`w-full py-3 ms-2 text-sm font-medium ${
                              settings.theme === "system"
                                ? "selected-text-color"
                                : "unselected-text-color"
                            }`}>
                            {eng ? "System" : "מערכת"}
                          </label>
                        </div>
                        <div className="flex items-center px-3">
                          <input
                            id="theme-light"
                            type="radio"
                            checked={settings.theme === "light"}
                            name="theme-radio"
                            onChange={(event) => changeSetting({ theme: "light" })}
                            className="w-4 h-4 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <label
                            htmlFor="theme-light"
                            className={`w-full py-3 ms-2 text-sm font-medium ${
                              settings.theme === "light"
                                ? "selected-text-color"
                                : "unselected-text-color"
                            }`}>
                            {eng ? "Light" : "בהיר"}
                          </label>
                        </div>
                        <div className="flex items-center px-3">
                          <input
                            id="theme-dark"
                            type="radio"
                            checked={settings.theme === "dark"}
                            name="theme-radio"
                            onChange={(event) => changeSetting({ theme: "dark" })}
                            className="w-4 h-4 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <label
                            htmlFor="theme-dark"
                            className={`w-full py-3 ms-2 text-sm font-medium ${
                              settings.theme === "dark"
                                ? "selected-text-color"
                                : "unselected-text-color"
                            }`}>
                            {eng ? "Dark" : "כהה"}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  <header
                    className={`mt-4 p-4 font-bold text-lg flex-1 text-[#955] ${
                      eng ? "text-left" : "text-right"
                    }`}>
                    {eng ? "Zmanim to Show" : "זמנים להציג"}
                  </header>
                  {ZmanTypes.map((zt) => (
                    <div
                      className="standard-text-color settings-background px-4 py-1 mb-1.5"
                      key={zt.id}>
                      <ToggleSwitch
                        theme={getCurrentTheme()}
                        text={eng ? zt.eng : zt.heb}
                        onText={eng ? "Showing" : "מציג"}
                        offText={eng ? "Not Showing" : "לא מציג"}
                        checked={!!settings.zmanimToShow.find((zts) => zts.id === zt.id)}
                        onChange={(checked: boolean) => changeZmanToShowList(zt, checked)}
                      />
                    </div>
                  ))}
                </section>
              </>
            )}
          </main>
        </article>
      </section>
      <section
        className="h-full cursor-pointer text-left"
        onClick={() => {
          setIsOpen(false);
        }}></section>
    </main>
  );
}
