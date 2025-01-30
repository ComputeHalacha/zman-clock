import React, { useState, useEffect } from "react";
import { Time, Utils, ZmanTime } from "jcal-zmanim";
import { useSettingsData } from "../../settingsContext";
import TimeIntervalText from "../TimeIntervalText";
import CloseButton from "../CloseButton";
import "./index.tsx.css";

type FullScreenProps = {
  isOpen: boolean;
  setIsOpen: Function;
  gotoNextZman: Function;
  zmanTime: ZmanTime;
  currentTime: Time;
};
export default function FullScreen({
  isOpen,
  setIsOpen,
  gotoNextZman,
  zmanTime,
  currentTime,
}: FullScreenProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { settings } = useSettingsData();
  const { english } = settings;
  const timeDiff = Utils.timeDiff(currentTime, zmanTime.time, !zmanTime.isTomorrow),
    was = timeDiff.sign === -1,
    minutes = Utils.totalMinutes(timeDiff),
    minutesFrom10 = 10 - minutes,
    isWithin10 = !was && !zmanTime.isTomorrow && minutes < 10,
    timeRemainingColor = was
      ? "#844"
      : isWithin10
      ? `rgb(${200 + minutesFrom10 * 5},
                        ${150 + minutesFrom10 * 5},
                        100)`
      : "#a99";  

  function handleScroll(event: UIEvent<HTMLDivElement, UIEvent>): void {
    const position = event.currentTarget.scrollTop;
    if (position > scrollPosition + 50) {
      gotoNextZman();
    }
    setScrollPosition(position);
  }  

  return (
    <main
      onClick={() => setIsOpen(false)}
      className={`fixed top-0 left-0 h-full w-full z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out
        ${
          isOpen
            ? "transition-opacity opacity-100 duration-500 translate-x-0"
            : "transition-all delay-500 opacity-0 -translate-x-full"
        } app-${settings.english ? "eng" : "heb"}`}>
      <section
        className={
          "left-0 absolute border border-zinc-800 rounded-r shadow bg-zinc-800 h-full w-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? "translate-x-0 " : " -translate-x-full ")
        }>
        <article className="relative border border-zinc-800 rounded-r shadow pb-10 flex flex-col space-y-6 overflow-y-scroll h-full w-full">
          <div
            className="fullscreen"
            onScroll={(ev) => handleScroll(ev)}>
            <CloseButton className="fullscreen-close-button" onClick={() => setIsOpen(false)} />
            <div className="fullscreen-single-zman">
              <div
                className={
                  english
                    ? "fullscreen-time-remaining-label-eng"
                    : "fullscreen-time-remaining-label"
                }
                style={{ color: was ? "#550" : "#99f" }}>
                <span
                  className={
                    english
                      ? "fullscreen-time-remaining-number-eng"
                      : "fullscreen-time-remaining-number"
                  }>
                  {english ? zmanTime.zmanType.eng : zmanTime.zmanType.heb}
                </span>
                {english ? `  ${was ? "passed" : "in"}:` : `  ${was ? "עבר לפני" : "בעוד"}:`}
              </div>
              <div
                className={
                  english ? "fullscreen-time-remaining-text-eng" : "fullscreen-time-remaining-text"
                }
                style={{ color: timeRemainingColor }}>
                  <TimeIntervalText time={timeDiff} hebrew={!english} />
              </div>
              &shy;
              <span
                className={
                  was
                    ? english
                      ? "fullscreen-man-type-name-text-was-eng"
                      : "fullscreen-zman-type-name-text-was"
                    : english
                    ? "fullscreen-zman-type-name-text-eng"
                    : "fullscreen-zman-type-name-text"
                }>
                {`${
                  zmanTime.time && zmanTime.isTomorrow && zmanTime.time.hour > 2
                    ? english
                      ? " Tomorrow"
                      : "מחר "
                    : ""
                } ${english ? "at" : "בשעה"}: `}
                <span
                  className={
                    isWithin10 ? "fullscreen-within-10-zman-time-text" : "fullscreen-zman-time-text"
                  }>
                  {Utils.getTimeString(zmanTime.time, 1, settings.armyTime)}
                </span>
              </span>
            </div>
          </div>
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
