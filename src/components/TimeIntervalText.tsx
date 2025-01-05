import { Time } from "jcal-zmanim";

interface TimeIntervalTextProps {
  time: Time;
  hebrew: boolean;
}

/**
 * Returns the given time interval in a formatted div.
 * @param {{hour:number, minute:number,second:number,sign?: 1 | -1}} time An object in the format {hour : 23, minute :42, second: 18 }
 * @param {boolean} hebrew
 */
export default function TimeIntervalText({ time, hebrew }: TimeIntervalTextProps) {
  return (
    <div style={{ textWrap: "pretty" }}>
      {time.hour > 0 && (
        <>
          {`${time.hour} ${
            time.hour === 1 ? (hebrew ? "שעה" : "hour") : hebrew ? "שעות" : "hours"
          }`}
          &nbsp;&shy;
        </>
      )}
      {time.minute > 0 && (
        <>
          {`${time.minute.toString()} ${
            time.minute === 1 ? (hebrew ? "דקה" : "minute") : hebrew ? "דקות" : "minutes"
          }`}
          &nbsp;&shy;
        </>
      )}
      {(time.second || 0) > 0 && (
        <>{`${Math.trunc(time.second || 0).toString()} ${
          time.second === 1 ? (hebrew ? "שנייה" : "second") : hebrew ? "שניות" : "seconds"
        }`}</>
      )}
    </div>
  );
}
