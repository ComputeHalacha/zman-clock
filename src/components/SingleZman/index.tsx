import React, { FunctionComponent, useState, useEffect } from "react";
import { useSettingsData } from "../../settingsContext";
import "./index.tsx.css";
import { Utils } from "jcal-zmanim";
import type { Time, ZmanTime } from "jcal-zmanim";

type SingleZManProps = {
  currentTime: Time;
  zt: ZmanTime;
  index: number;
  itemHeight: number;
};

const SingleZman: FunctionComponent<SingleZManProps> = ({
  currentTime,
  zt,
  index,
  itemHeight,
}: SingleZManProps) => {
  const { settings } = useSettingsData();
  const { english, numberOfItemsToShow, location } = settings;
  if (index >= numberOfItemsToShow) return null;
  const timeDiff = Utils.timeDiff(currentTime, zt.time, !zt.isTomorrow),
    was = timeDiff.sign === -1,
    minutes = Utils.totalMinutes(timeDiff),
    minutesFrom10 = 10 - minutes,
    isWithin10 = !was && !zt.isTomorrow && minutes < 10,
    timeRemainingColor = was
      ? "#844"
      : isWithin10
      ? `rgb(${200 + minutesFrom10 * 5},
                        ${150 + minutesFrom10 * 5},
                        100)`
      : "#a99";
  return (
    <>
      <div className="single-zman" style={{ height: `${itemHeight}%` }}>
        <div
          className={english ? "time-remaining-label-eng" : "time-remaining-label"}
          style={{ color: was ? "#550" : "#99f" }}>
          <span className={english ? "time-remaining-number-eng" : "time-remaining-number"}>
            {english ? zt.zmanType.eng : zt.zmanType.heb}
          </span>
          {english ? `  ${was ? "passed" : "in"}:` : `  ${was ? "עבר לפני" : "בעוד"}:`}
        </div>
        <div
          className={english ? "time-remaining-text-eng" : "time-remaining-text"}
          style={{ color: timeRemainingColor }}>
          {english
            ? Utils.getTimeIntervalTextString(timeDiff)
            : Utils.getTimeIntervalTextStringHeb(timeDiff)}
        </div>
        <span
          className={
            was
              ? english
                ? "zman-type-name-text-was-eng"
                : "zman-type-name-text-was"
              : english
              ? "zman-type-name-text-eng"
              : "zman-type-name-text"
          }>
          {`${
            zt.time && zt.isTomorrow && zt.time.hour > 2 ? (english ? " Tomorrow" : "מחר ") : ""
          } ${english ? "at" : "בשעה"}: `}
          <span className={isWithin10 ? "within-10-zman-time-text" : "zman-time-text"}>
            {Utils.getTimeString(zt.time, 1, settings.armyTime)}
          </span>
        </span>
      </div>
    </>
  );
};
export { SingleZman };
