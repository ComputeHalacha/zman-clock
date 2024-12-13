import { useState, useEffect } from "react";
import { useSettingsData } from "../../settingsContext";
import { Location, ZmanToShow, ZmanTypes } from "jcal-zmanim";
import ToggleSwitch from "../toggleSwitch";
import Settings from "../../settings";
import LocationChooser from "../LocationChooser";
import CloseButton from "../CloseButton";

interface SettingsChooserProps {
  onChangeSettings: () => any;
  onClose: Function;
  showLocation: boolean;
}

export default function SettingsChooser({
  onChangeSettings,
  onClose,
  showLocation,
}: SettingsChooserProps) {
  const { settings, setSettings, resetZmanimToShowSettings } = useSettingsData();
  const [showLocationChooser, setShowLocationChooser] = useState(showLocation);
  const eng = settings.english;

  useEffect(() => 
    setShowLocationChooser(showLocation), [showLocation]);

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
    <main style={{ direction: "ltr" }}>
      {showLocationChooser ? (
        <section className="h-full w-full">
          <LocationChooser
            location={settings.location}
            onChangeLocation={changeLocation}
            eng={eng}
            onClose={() => setShowLocationChooser(false)}
          />
        </section>
      ) : (
        <>
          <section>
            <article className="flex justify-between flex-row align-top p-2">
              <a onClick={() => resetZmanimToShowSettings()} className="text-[#944] cursor-pointer">
                {eng ? "Reset" : "איפוס"}
              </a>
              <header className="p-4 font-bold text-3xl flex-1 text-center  text-[#955]">
                {eng ? "Settings" : "הגדרות"}
              </header>
              <CloseButton onClick={() => onClose()} />
            </article>
          </section>
          <section className="h-full settings-chooser" style={{ direction: eng ? "ltr" : "rtl" }}>
            <div className="flex flex-row justify-between items-center px-4 py-2 mb-1.5 bg-[#212223]">
              <div className="text-gray-400">{eng ? "Language" : "שפה"}</div>
              <div className="flex">
                <div className="flex items-center px-3">
                  <input
                    id="horizontal-list-eng"
                    type="radio"
                    checked={eng}
                    name="list-radio"
                    onChange={(event) => changeSetting({ english: event.target.checked })}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500 cursor-pointer"
                  />
                  <label
                    htmlFor="horizontal-list-eng"
                    className={`w-full py-3 ms-2 text-sm font-medium ${
                      eng ? "text-amber-400" : "text-blue-700"
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                  />
                  <label
                    htmlFor="horizontal-list-heb"
                    className={`w-full py-3 ms-2 text-sm font-medium ${
                      eng ? "text-blue-700" : "text-amber-400"
                    }`}>
                    עברית
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center px-4 py-2 mb-1.5 bg-[#212223]">
              <div className="text-gray-400">{eng ? "Location" : "מיקום"}</div>
              <div className="text-amber-400">
                {eng
                  ? settings.location.Name
                  : settings.location.NameHebrew || settings.location.Name}
              </div>
              <div
                className="ms-3 text-sm font-medium text-blue-700 cursor-pointer"
                onClick={() => setShowLocationChooser(true)}>
                {eng ? "Change" : "שנה"}
              </div>
            </div>
            <div className="flex flex-col items-center px-4">
              <div className="px-4 py-2 mb-1.5 bg-[#212223] w-full">
                <ToggleSwitch
                  text={eng ? "Show Notifications" : "הצג הודעות"}
                  onText={eng ? "Showing" : "מציג"}
                  offText={eng ? "Not Showing" : "לא מציג"}
                  checked={settings.showNotifications}
                  onChange={(checked: boolean) => changeSetting({ showNotifications: checked })}
                />
              </div>
              <div className="px-4 py-1 mb-1.5 bg-[#212223] w-full">
                <ToggleSwitch
                  text={eng ? "Show Daf Yomi" : "הצג דף היומי"}
                  onText={eng ? "Showing" : "מציג"}
                  offText={eng ? "Not Showing" : "לא מציג"}
                  checked={settings.showDafYomi}
                  onChange={(checked: boolean) => changeSetting({ showDafYomi: checked })}
                />
              </div>
              <div className="px-4 py-1 mb-1.5 bg-[#212223] w-full">
                <ToggleSwitch
                  text={eng ? "24 Hour [army] Clock" : "שעון 24 שעות"}
                  onText={eng ? "Showing" : "מציג"}
                  offText={eng ? "Not Showing" : "לא מציג"}
                  checked={settings.armyTime}
                  onChange={(checked: boolean) => changeSetting({ armyTime: checked })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start text-gray-400 px-4 py-1 mb-1.5 bg-[#212223]">
              <ToggleSwitch
                text={eng ? 'Show Shir-Shel-Yom of Gr"a' : 'הצג שיר של יום של הגר"א'}
                onText={eng ? "Showing" : "מציג"}
                offText={eng ? "Not Showing" : "לא מציג"}
                checked={settings.showGaonShir}
                onChange={(checked: boolean) => changeSetting({ showGaonShir: checked })}
              />
            </div>
            <div className="flex flex-row justify-between items-center px-4 py-1 mb-1.5 bg-[#212223]">
              <div className="text-gray-400">
                {eng ? "Minutes to show past Zmanim" : "דקות להציג זמנים שעברו"}
              </div>
              <input
                type="number"
                value={settings.minToShowPassedZman}
                className="text-amber-400 w-1/5 rounded text-center bg-[#292928]"
                onChange={(e) => changeSetting({ minToShowPassedZman: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex flex-row justify-between items-center px-4 py-1 mb-1.5 bg-[#212223]">
              <div className="text-gray-400">
                {eng ? "Number of Zmanim to Show" : "מספר זמנים להציג"}
              </div>
              <input
                type="number"
                value={settings.numberOfItemsToShow}
                className="text-amber-400  w-1/5 rounded text-center bg-[#292928]"
                onChange={(e) => changeSetting({ numberOfItemsToShow: parseInt(e.target.value) })}
              />
            </div>
            <header
              className={`mt-4 p-4 font-bold text-lg flex-1 text-[#955] ${
                eng ? "text-left" : "text-right"
              }`}>
              {eng ? "Zmanim to Show" : "זמנים להציג"}
            </header>
            {ZmanTypes.map((zt) => (
              <div className="px-4 py-1 mb-1.5 text-gray-400 bg-[#212223]" key={zt.id}>
                <ToggleSwitch
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
  );
}
