import React from "react";
import { useSettingsData } from "../../settingsContext";
import { Utils } from "jcal-zmanim";
import type { Time, ZmanTime } from "jcal-zmanim";
import TimeIntervalText from "../TimeIntervalText";
import "./index.tsx.scss";

interface SingleZManProps extends React.HTMLAttributes<HTMLDivElement> {
  currenttime: Time;
  zt: ZmanTime;
  index: number;
}

const SingleZman: React.FC<SingleZManProps> = (props: SingleZManProps) => {
  const { settings } = useSettingsData();
  const { english, numberOfItemsToShow } = settings;
  const { currenttime, zt, index } = props;

  if (index >= numberOfItemsToShow) return null;

  const timeDiff = Utils.timeDiff(currenttime, zt.time, !zt.isTomorrow);
  const was = timeDiff.sign === -1;
  const minutes = Utils.totalMinutes(timeDiff);
  const minutesFrom10 = 10 - minutes;
  const isWithin10 = !was && !zt.isTomorrow && minutes < 10;
  const timeRemainingColor = was
    ? "var(--time-text-was-color)"
    : isWithin10
    ? `rgb(${200 + minutesFrom10 * 5},
                        ${150 + minutesFrom10 * 5},
                        100)`
    : "var(--time-text-remaining-color)";

  return (
    <div className="single-zman" draggable={true} {...props}>
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
        <TimeIntervalText time={timeDiff} hebrew={!english} />
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
        {`${zt.time && zt.isTomorrow && zt.time.hour > 2 ? (english ? " Tomorrow" : "מחר ") : ""} ${
          english ? "at" : "בשעה"
        }: `}
        <span className={isWithin10 ? "within-10-zman-time-text" : "zman-time-text"}>
          {Utils.getTimeString(zt.time, 1, settings.armyTime)}
        </span>
      </span>
    </div>
  );
};
export { SingleZman };
