import CloseButton from "../CloseButton";
import { version } from "../../../package.json";
import favicon from "../../../favicon.png";
import "./index.tsx.scss";

interface HelpModalProps {
  onClose: () => void;
  english?: boolean;
  isOpen: boolean;
}

export default function HelpModal({ english, onClose, isOpen }: HelpModalProps) {
  const hebrew = !english;
  return (
    <div
      className={
        "fixed z-50 inset-0 flex items-center justify-center overflow-hidden h-full w-full " +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0  "
          : "transition-all delay-500 opacity-0 -translate-x-full  ")
      }
      onClick={() => onClose()}>
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-[#555] opacity-75 h-full w-full"></div>
      </div>
      <div
        className={`rounded-lg text-left overflow-hidden shadow-xl transform transition-transform duration-300 ease-in-out max-w-[90%] text-${
          english ? "left" : "right"
        } ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="help-modal-outside-color px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[85vh] overflow-hidden">
          <div className="flex flex-row justify-between items-center text-center">
            <img src={favicon} alt="Zman Clock" className="h-10 w-10" />
            <h3 className="text-lg leading-6 font-large font-bold text-gray-500">
              {english ? "Zman Clock" : "שעון זמנים"}
            </h3>
            <CloseButton onClick={() => onClose()} />
          </div>
          <div className="help-modal-outside-color text-xs text-center">Version {version}</div>
          <div
            className="help-modal-inside mt-2 text-sm rounded-lg p-3 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            {english ? (
              <div style={{ direction: "ltr" }}>
                <p>
                  Zman Clock is a Halachic Zmanim clock that shows a list of upcoming Zmanim and how
                  much time remains until that Zman.
                </p>

                <div>
                  Zman Clock also shows:
                  <ol>
                    <li>
                      The current Jewish date. Note that at sunset, the Jewish date changes to the
                      next day.
                    </li>

                    <li>The current civil date. The civil date changes at midnight.</li>

                    <li>
                      A extensive list of daily Halachic information, such as Rosh Chodesh, Yom Tov
                      etc.
                    </li>
                    <li>
                      A list of daily relevant notifications specific for Tefillah. Such as Yaaleh
                      Veyavo, Sefiras Haomer and many, many more. For example, when there is Bircas
                      Hachodesh, the correct time of the Molad will be shown for announcing in Shul.
                    </li>
                  </ol>
                </div>
                <p>
                  Zman Clock has a default list of which Zmanim to show, but this list is fully
                  customizable.
                </p>

                <p>
                  Adding and removing from the list of Zmanim can be done by opening the Settings
                  section by pressing or clicking on the Settings icon in the top left corner, and
                  then toggling the Zman you wish to show or hide.
                </p>

                <p>
                  You can also have Zman Clock show a large countdown to a particular Zman, by
                  pressing or clicking on any Zman being shown in the center section.
                </p>

                <p>
                  The Zmanim shown are for the location set in the Settings, and the time is taken
                  from the current system.
                </p>

                <p>In the settings section, you can set:</p>
                <ul>
                  <li>The application language.</li>

                  <li>
                    The current location - choose from a vast list of locations, almost anywhere in
                    the world.
                  </li>

                  <li>Whether or not to show the Daily Halachic notifications.</li>

                  <li>Whether or not to show the daily Daf Yomi</li>

                  <li>Which style time to show - regular (12 hour AM/PM) or army (24 hour)</li>

                  <li>Whether or not to show the Shir Shel Yom of the Gr”a.</li>

                  <li>
                    How many minutes after an active Zman has past to continue showing the
                    notification.
                  </li>
                  <li>The maximum number of Zmanim to be shown at one time.</li>
                </ul>
              </div>
            ) : (
              <div style={{ direction: "rtl" }}>
                <p>
                  שעון זמנם הוא שעון הלכתי לזמנים שמראה רשימה של זמני היום הקרובים וכמה זמן נותר עד
                  אותו זמן.
                </p>

                <div>
                  שעון זמן מציג גם:
                  <ol>
                    <li>את התאריך היהודי הנוכחי. שים לב שבשקיעה, התאריך היהודי משתנה ליום הבא.</li>
                    <li>את התאריך האזרחי הנוכחי. התאריך האזרחי משתנה בחצות.</li>
                    <li>רשימה מקיפה של מידע הלכתי יומי, כגון ראש חודש, יום טוב וכו'.</li>
                    <li>
                      רשימה של התראות יומיות רלוונטיות לתפילה, כגון יעלה ויבוא, ספירת העומר ועוד
                      רבים. למשל, כאשר יש ברכת החודש, הזמן המדויק של המולד יוצג להכרזה בבית הכנסת.
                    </li>
                  </ol>
                </div>
                <p>
                  לשעון זמן יש רשימת ברירת מחדל של אילו זמנים להציג, אך רשימה זו ניתנת להתאמה אישית
                  מלאה.
                </p>
                <p>
                  ניתן להוסיף ולהסיר מהרשימה של הזמנים על ידי פתיחת סעיף ההגדרות על ידי לחיצה על סמל
                  ההגדרות בפינה העליונה השמאלית, ואז הפעלת או ביטול הזמן שברצונך להציג או להסתיר.
                </p>
                <p>
                  ניתן גם לגרום לשעון זמן להציג ספירה לאחור גדולה לזמן מסוים, על ידי לחיצה על כל זמן
                  המוצג בחלק המרכזי.
                </p>
                <p>הזמנים המוצגים הם עבור המיקום שנקבע בהגדרות, והזמן נלקח מהמערכת הנוכחית.</p>
                <p>בסעיף ההגדרות, ניתן להגדיר:</p>
                <ul>
                  <li>את שפת היישום.</li>
                  <li>את המיקום הנוכחי - בחר מתוך רשימה רחבה של מיקומים, כמעט בכל מקום בעולם.</li>
                  <li>האם להציג את ההודעות ההלכתיות היומיות.</li>
                  <li>האם להציג את הדף היומי.</li>
                  <li>איזה סגנון זמן להציג - רגיל (12 שעות AM/PM) או צבאי (24 שעות).</li>
                  <li>האם להציג את שיר של יום של הגר"א.</li>
                  <li>כמה דקות לאחר זמן פעיל שחלף להמשיך להציג את ההודעה.</li>
                  <li>המספר המרבי של זמנים שיוצגו בבת אחת.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
