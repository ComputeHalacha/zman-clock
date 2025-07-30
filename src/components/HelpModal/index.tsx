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
              <div style={{ direction: "ltr" }} className="help-modal-text">
                <p>
                  Zman Clock is a Halachic Zmanim clock that shows a list of upcoming Zmanim and how
                  much time remains until that Zman.
                </p>
                <div>
                  Zman Clock also shows:
                  <ul>
                    <li>
                      The current Jewish date. Note that at sunset, the Jewish date changes to the
                      next day.
                    </li>
                    <li>The current civil date. The civil date changes at midnight.</li>
                    <li>
                      A complete list of each day's information as it pertains to any Halacha, such
                      as Rosh Chodesh, Yom Tov etc.
                    </li>
                    <li>
                      A list of relevant notifications pertaining to Tefillah.
                      <br />
                      For example, Yaaleh Veyavo, Sefiras Haomer, Hallel, Krias Hatorah, and many,
                      many more.
                      <br />
                      Included, are full details about each notification.
                      <br />
                      For example, when there is Bircas Hachodesh, the correct time of the Molad
                      will be shown for announcing in Shul.
                      <br />
                      During Sefiras Haomer, the notification will indicate which night to count,
                      <br />
                      and for Krias Hatorah, it will specify the Torah reading for that day.
                    </li>
                  </ul>
                </div>
                <p>
                  The daily Zmanim that are shown, are for the current location set in the Settings.
                  <br />
                  The current time is taken from the current system.
                </p>
                <p>
                  The date for which to show the Zmanim can be changed by pressing or clicking on
                  the round plus and minus icons to either side of the current Jewish Date.
                  <br />
                  The plus icon will show the Zmanim for the next day, and the minus icon will show
                  the Zmanim for the previous day.
                  <br />
                  To go back to the current day, click or press on the Jewish Date.
                </p>
                <p>
                  You can change the current location by pressing or clicking on the location name
                  shown in the top center of the app, then select the desired location from the
                  list.
                </p>
                <p>
                  Zman Clock has a default list of which daily Zmanim to show, and this list is
                  fully customizable.
                </p>
                <p>
                  Adding and removing from the list of Zmanim, can be done by opening the Settings
                  section - by pressing or clicking on the Settings icon in the top left corner, and
                  then toggling the Zman you wish to show or hide.
                </p>
                <p>
                  You can have Zman Clock show a large countdown to a particular Zman, by pressing
                  or clicking on any Zman being shown in the center section.
                </p>
                <p>In the settings section, you can set:</p>
                <ul>
                  <li>
                    <strong>Language</strong> - The application language.
                  </li>
                  <li>
                    <strong>Location</strong> - The current location - choose from a vast list of
                    locations, almost anywhere in the world.
                  </li>
                  <li>
                    <strong>Show Notifications</strong> - Whether or not to show the Daily Halachic
                    notifications.
                  </li>
                  <li>
                    <strong>Show Daf Yomi</strong> - Whether or not to show the daily Daf Yomi
                  </li>
                  <li>
                    <strong>24 Hour [army] Clock</strong> - Which style time to show - regular (12
                    hour AM/PM) or army (24 hour)
                  </li>
                  <li>
                    <strong>Show Shir-Shel-Yom of Gr"a</strong> - Whether or not to show the Shir
                    Shel Yom of the Gr”a.
                  </li>
                  <li>
                    <strong>Minutes to show past Zmanim</strong> - How many minutes after an active
                    Zman has past to continue showing the notification.
                  </li>
                  <li>
                    <strong>Number of Zmanim to Show</strong> - The maximum number of Zmanim to be
                    shown at one time.
                  </li>
                  <li>
                    <strong>Automatic Color Scheme</strong> - Whether or not to enable the automatic
                    color scheme. Will show the Light theme during the day and the Dark theme at
                    night.
                  </li>
                  <li>
                    <strong>Color Scheme</strong> - If the automatic color scheme is disabled,
                    choose between Light and Dark themes, or use the current System theme.
                  </li>
                </ul>
              </div>
            ) : (
              <div style={{ direction: "rtl" }} className="help-modal-text">
                <p>
                  שעון זמנים הוא שעון הלכתי לזמנים שמראה רשימה של זמני היום וכמה זמן נותר עד אותו
                  זמן.
                </p>
                <div>
                  שעון זמן מציג גם:
                  <ul>
                    <li>את התאריך הנוכחי. שים לב שבשקיעה, התאריך משתנה ליום הבא.</li>
                    <li>את התאריך האזרחי הנוכחי. התאריך האזרחי משתנה בחצות.</li>
                    <li>
                      רשימה מקיפה של מידע יומי כפי שהוא נוגע להלכה, כגון ראש חודש, יום טוב וכו'.
                    </li>
                    <li>
                      רשימה של הודעות רלוונטיות לתפילה.
                      <br />
                      לדוגמה, יעלה ויבוא, ספירת העומר, הלל, קריאת התורה, ועוד רבים.
                      <br />
                      כל הודעה כוללת פרטים מלאים.
                      <br />
                      לדוגמה, כאשר יש ברכת החודש, הזמן המדויק של המולד יוצג להכרזה בבית הכנסת.
                      <br />
                      במהלך ספירת העומר, ההודעה תציין איזו יום יש לספור,
                      <br />
                      ובקריאת התורה, תצוין הקריאה לאותו יום.
                    </li>
                  </ul>
                </div>
                <p>
                  הזמנים היומיים שמוצגים הם עבור המיקום הנוכחי שנבחר בהגדרות.
                  <br />
                  השעה הנוכחית נלקחת מהמערכת.
                </p>
                <p>
                  ניתן לשנות את התאריך עבורו מוצגים הזמנים על ידי לחיצה על האייקונים העגולים של פלוס
                  ומינוס משני צידי התאריך העברי הנוכחי.
                  <br />
                  האייקון פלוס יציג את הזמנים של היום הבא, והמינוס את הזמנים של היום הקודם.
                  <br />
                  כדי לחזור ליום הנוכחי, יש ללחוץ על התאריך העברי.
                </p>
                <p>
                  ניתן לשנות את המיקום הנוכחי על ידי לחיצה על שם המיקום שמופיע במרכז העליון של
                  האפליקציה, ואז לבחור את המיקום הרצוי מהרשימה.
                </p>
                <p>
                  לשעון זמן יש רשימת ברירת מחדל של אילו זמני יום להציג, אך הרשימה ניתנת להתאמה אישית
                  מלאה.
                </p>
                <p>
                  ניתן להוסיף ולהסיר מהרשימה של הזמנים על ידי פתיחת סעיף ההגדרות - על ידי לחיצה על
                  סמל ההגדרות בפינה השמאלית העליונה, ואז להפעיל או לבטל את הזמן שברצונך להציג או
                  להסתיר.
                </p>
                <p>
                  ניתן גם לגרום לשעון זמן להציג ספירה לאחור גדולה לזמן מסוים, על ידי לחיצה על כל זמן
                  שמוצג במרכז.
                </p>
                <p>בסעיף ההגדרות, ניתן להגדיר:</p>
                <ul>
                  <li>
                    <strong>שפה</strong> - שפת היישום.
                  </li>
                  <li>
                    <strong>מיקום</strong> - המיקום הנוכחי - בחר מתוך רשימה רחבה של מיקומים, כמעט
                    בכל מקום בעולם.
                  </li>
                  <li>
                    <strong>הצגת התראות</strong> - האם להציג את ההתראות ההלכתיות היומיות.
                  </li>
                  <li>
                    <strong>הצגת דף יומי</strong> - האם להציג את הדף היומי.
                  </li>
                  <li>
                    <strong>שעון 24 שעות</strong> - איזה סגנון זמן להציג - רגיל (12 שעות AM/PM) או
                    צבאי (24 שעות).
                  </li>
                  <li>
                    <strong>הצגת שיר של יום של הגר"א</strong> - האם להציג את שיר של יום של הגר"א.
                  </li>
                  <li>
                    <strong>מספר דקות להציג אחרי זמן שעבר</strong> - כמה דקות לאחר זמן פעיל שחלף
                    להמשיך להציג את ההודעה.
                  </li>
                  <li>
                    <strong>מספר הזמנים להציג</strong> - המספר המרבי של זמנים שיוצגו בבת אחת.
                  </li>
                  <li>
                    <strong>ערכת צבעים אוטומטית</strong> - האם להפעיל ערכת צבעים אוטומטית. תציג ערכת
                    צבעים בהירה ביום וערכת צבעים כהה בלילה.
                  </li>
                  <li>
                    <strong>ערכת צבעים</strong> - אם ערכת הצבעים האוטומטית כבויה, ניתן לבחור בין
                    ערכת צבעים בהירה, כהה, או להשתמש בערכת הצבעים
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
