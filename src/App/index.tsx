import { useState, useEffect, DragEvent } from "react";
import {polyfill} from "mobile-drag-drop";
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";

import {
  jDate,
  Utils,
  getNotifications,
  ZmanimUtils,
  Zmanim,
  DaysOfWeek,
  ZmanTypes,
} from "jcal-zmanim";
import { useSettingsData } from "../settingsContext";
import Settings from "../settings";
import { SingleZman } from "../components/SingleZman";
import Drawer from "../components/Drawer";
import SettingsChooser from "../components/SettingsChooser";
import FullScreen from "../components/FullScreen";
import Sidebar from "../components/Sidebar";
import HelpModal from "../components/HelpModal";
import "./index.tsx.css";
import type { SunTimes, Time, ShulZmanimType, ZmanTime, ZmanToShow, Location } from "jcal-zmanim";

export default function App() {
  const initialSettings = new Settings();
  const initialSDate = new Date();
  const initialJdate = new jDate(initialSDate);
  const { settings, setSettings } = useSettingsData();

  const [sdate, setSdate] = useState<Date>(initialSDate);
  const [jdate, setJdate] = useState<jDate>(initialJdate);
  const [sunTimes] = useState<SunTimes>(initialJdate.getSunriseSunset(initialSettings.location));
  const [currentTime, setCurrentTime] = useState<Time>(Utils.timeFromDate(initialSDate));
  const [notifications, setNotifications] = useState<{
    dayNotes: string[];
    tefillahNotes: string[];
  } | null>({ dayNotes: [], tefillahNotes: [] });
  const [shulZmanim, setShulZmanim] = useState<ShulZmanimType>(
    ZmanimUtils.getBasicShulZmanim(initialSDate, initialSettings.location) as ShulZmanimType
  );
  const [zmanTimes, setZmanTimes] = useState<ZmanTime[]>();
  const [needsFullRefresh, setNeedsFullRefresh] = useState(true);
  const [needsNotificationsRefresh, setNeedsNotificationsRefresh] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [fullScreenZman, setFullScreenZman] = useState<ZmanTime>({
    time: { hour: 0, minute: 0 },
    isTomorrow: false,
    zmanType: {
      id: 0,
      desc: "",
      eng: "",
      heb: "",
      offset: undefined,
      whichDaysFlags: undefined,
    },
  });
  const [isNightTime, setIsNightTime] = useState(false);
  const [isBeinHashmashos, setIsBeinHashmashos] = useState(false);
  //Run once
  useEffect(() => {
    polyfill({
      dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
  });
  window.addEventListener( 'touchmove', function() {}, {passive: false});
    setInitialData();
  }, []);

  //Run repeatedly
  useEffect(() => {
    const interval = window.setInterval(refresh, 1000);
    return () => clearInterval(interval);
  });
  const ZmanTypeIds = Object.freeze({
    ChatzosLayla: 0,
    Alos90: 1,
    Alos72: 2,
    TalisTefillin: 3,
    NetzAtElevation: 4,
    NetzMishor: 5,
    szksMga: 6,
    szksGra: 7,
    sztMga: 8,
    sztGra: 9,
    chatzosDay: 10,
    minGed: 11,
    minKet: 12,
    plag: 13,
    shkiaAtSeaLevel: 14,
    shkiaElevation: 15,
    tzais45: 16,
    tzais50: 17,
    tzais72: 18,
    rabbeinuTamZmanios: 19,
    rabbeinuTamZmaniosMga: 20,
    candleLighting: 21,
    SofZmanEatingChometz: 22,
    SofZmanBurnChometz: 23,
  });
  const setInitialData = () => {
    setNeedsNotificationsRefresh(true);
    setNeedsFullRefresh(true);
  };
  const refresh = () => {
    const sd = new Date(),
      nowTime = Utils.timeFromDate(sd);

    if (!needsFullRefresh && !needsZmanRefresh(sd, nowTime)) {
      if (Utils.isSameSdate(jdate.getDate(), sd) && Utils.isTimeAfter(sunTimes.sunset, nowTime)) {
        setJdate(jdate.addDays(1));
      }
      setSdate(sd);
      setCurrentTime(nowTime);
      setJdate(jdate);
    } else {
      console.log("Refreshing all zmanim");
      const sunset = Zmanim.getSunTimes(sd, settings.location).sunset,
        jdate = Utils.isTimeAfter(sunset, nowTime)
          ? new jDate(Utils.addDaysToSdate(sd, 1))
          : new jDate(sd),
        zmanTimes = getCorrectZmanTimes(
          sd,
          nowTime,
          settings.location as Location,
          settings.zmanimToShow,
          settings.minToShowPassedZman,
          sunTimes.sunset as Time
        );
      setZmanTimes(zmanTimes);
      setSdate(sd);
      setJdate(jdate);
      setCurrentTime(nowTime);
      setShulZmanim(
        ZmanimUtils.getBasicShulZmanim(sd, settings.location as Location) as ShulZmanimType
      );
    }
    fillNotifications();
    setNeedsFullRefresh(false);

    const { alos, shkia } = shulZmanim,
      isBeforeAlos = Utils.isTimeAfter(nowTime, alos),
      isAfterShkia = Utils.isTimeAfter(shkia, nowTime),
      isNight = isBeforeAlos && isAfterShkia,
      beinHashmashos = isNight && Utils.isTimeAfter(nowTime, Utils.addMinutes(shkia, 20));

    setIsNightTime(isNight);
    setIsBeinHashmashos(beinHashmashos);
  };

  const isPastShulZman = () => {
    const nowTime = currentTime,
      { chatzosHayom, chatzosHalayla, alos, shkia } = shulZmanim;

    //Notifications need refreshing by chatzos, alos and shkia
    if (shkia && Utils.isTimeAfter(shkia, nowTime)) {
      //We only want to refresh the notifications one time
      shulZmanim.shkia = undefined;
      //Nullify passed zmanim, we are refreshing anyway.
      shulZmanim.alos = undefined;
      shulZmanim.chatzosHayom = undefined;
      if (chatzosHalayla && chatzosHalayla.hour < 12) {
        shulZmanim.chatzosHalayla = undefined;
      }
      console.log("Refreshing notifications due to shkia.");
      return true;
    } else if (chatzosHayom && Utils.isTimeAfter(chatzosHayom, nowTime)) {
      //We only want to refresh the notifications one time
      shulZmanim.chatzosHayom = undefined;
      //Nullify passed zmanim, we are refreshing anyway.
      shulZmanim.alos = undefined;
      if (chatzosHalayla && chatzosHalayla.hour < 12) {
        shulZmanim.chatzosHalayla = undefined;
      }
      console.log("Refreshing notifications due to chatzos hayom.");
      return true;
    } else if (alos && Utils.isTimeAfter(alos, nowTime)) {
      //We only want to refresh the notifications one time
      shulZmanim.alos = undefined;
      //Nullify passed zmanim, we are refreshing anyway.
      if (chatzosHalayla && chatzosHalayla.hour < 12) {
        shulZmanim.chatzosHalayla = undefined;
      }
      console.log("Refreshing notifications due to alos.");
      return true;
    } else if (chatzosHalayla && Utils.isTimeAfter(chatzosHalayla, nowTime)) {
      //We only want to refresh the notifications one time
      shulZmanim.chatzosHalayla = undefined;
      console.log("Refreshing notifications due to chatzosHalayla.");
      return true;
    }
    return false;
  };
  const fillNotifications = () => {
    if (settings.showNotifications) {
      if (needsFullRefresh || needsNotificationsRefresh || isPastShulZman()) {
        const notifications = getNotifications(
          jdate,
          currentTime,
          settings.location,
          settings.english,
          settings.showGaonShir,
          settings.showDafYomi
        );
        setNeedsNotificationsRefresh(false);
        setNotifications(notifications);
        console.log("Refreshing notifications: ", jdate, sdate, currentTime);
      }
    } else if (
      notifications &&
      (notifications.dayNotes.length || notifications.tefillahNotes.length)
    ) {
      //If setting is off, hide all notifications
      setNotifications(null);
    }
  };
  const needsZmanRefresh = (sd: Date, nowTime: Time) => {
    return (
      needsFullRefresh ||
      !sdate ||
      sd.getDate() !== sdate.getDate() ||
      !zmanTimes ||
      zmanTimes.some(
        (zt) =>
          !zt.isTomorrow &&
          Utils.totalMinutes(nowTime) - Utils.totalMinutes(zt.time) >= settings.minToShowPassedZman
      )
    );
  };
  /**
   * Returns the date corrected time of the given zmanim on the given date at the given location
   * If the zman is after or within 30 minutes of the given time, this days zman is returned, otherwise tomorrows zman is returned.
   */
  const getCorrectZmanTimes = (
    date: Date | jDate,
    time: Time,
    location: Location,
    zmanimTypes: ZmanToShow[],
    minToShowPassedZman: number,
    sunset: Time
  ) => {
    const correctedTimes = [],
      { sdate, jdate } = Utils.bothDates(date),
      tomorrowJd = jdate.addDays(1),
      tomorrowSd = Utils.addDaysToSdate(sdate, 1),
      /*  Candle lighting and chometz times are not shown after sunset.
                This solves the issue of Candle lighting showing as having "passed 20 minutes ago"
                Thursday evening after sunset - which shows as hasCandleLighting = true
                as it is already Friday... */
      zmanTimes = ZmanimUtils.getZmanTimes(
        zmanimTypes.filter(
          (zt) =>
            !(
              zt.id === ZmanTypeIds.candleLighting ||
              zt.id === ZmanTypeIds.SofZmanEatingChometz ||
              zt.id === ZmanTypeIds.SofZmanBurnChometz
            ) || Utils.isTimeAfter(time, sunset)
        ),
        sdate,
        jdate,
        location
      ),
      tomorrowTimes = ZmanimUtils.getZmanTimes(
        //Candle lighting tomorrow is never shown...
        zmanimTypes.filter((zt) => zt.id !== ZmanTypeIds.candleLighting),
        tomorrowSd,
        tomorrowJd,
        location
      );

    for (let zt of zmanTimes) {
      let oTime = zt.time as Time,
        isTomorrow = false,
        diff = Utils.timeDiff(time, oTime, true);
      if (diff.sign < 1 && Utils.totalMinutes(diff) >= minToShowPassedZman) {
        const tom = tomorrowTimes.find((t) => t.zmanType === zt.zmanType);
        if (tom && tom.time) {
          oTime = tom.time;
          isTomorrow = true;
        }
      }
      correctedTimes.push({
        zmanType: zt.zmanType,
        time: oTime,
        isTomorrow,
      });
    }
    return correctedTimes.sort(
      (a, b) =>
        (a.isTomorrow ? 1 : -1) - (b.isTomorrow ? 1 : -1) ||
        Utils.totalSeconds(a.time) - Utils.totalSeconds(b.time)
    );
  };
  const getDateText = () => {
    if (jdate.DayOfWeek === DaysOfWeek.SUNDAY && isNightTime) {
      //Motzai Shabbos gets a special day of the week name
      return settings.english
        ? `${isBeinHashmashos ? "Bein Hashmashos" : "Motza'ei Shabbos"} ${jdate.toStringHeb(true)}`
        : `${isBeinHashmashos ? "בין השמשות" : "מוצאי שבת"} ${jdate.toString(true)}`;
    } else {
      return settings.english ? jdate.toString() : jdate.toStringHeb();
    }
  };
  const showFullScreen = (zt: ZmanTime) => {
    setFullScreenZman(zt);
    setIsFullScreenOpen(true);
  };

  const goToNextZman = () => {
    if (zmanTimes) {
      const index = zmanTimes?.indexOf(fullScreenZman) || 0;
      setFullScreenZman(zmanTimes[index + 1]);
    }
  };

  const sidebarOnDrop = (event: DragEvent<HTMLElement>): void => {
    const zmanTypeId = parseInt(event.dataTransfer.getData("ZmanTypeToHide"));
    if (!isNaN(zmanTypeId)) {
      let list = [...settings.zmanimToShow];
      if (list.find((zts) => zts.id === zmanTypeId)) {
        list = list.filter((zts) => zts.id !== zmanTypeId);
      }
      setSettings({ ...settings, zmanimToShow: list } as Settings);
      setNeedsFullRefresh(true);
    }
  };

  const appOnDrop = (event: DragEvent<HTMLElement>): void => {
    const zmanTypeId = parseInt(event.dataTransfer.getData("ZmanTypeToShow"));
    if (!isNaN(zmanTypeId)) {
      const zts = ZmanTypes.find((zt) => zt.id === zmanTypeId);
      setSettings({ ...settings, zmanimToShow: [...settings.zmanimToShow, zts] } as Settings);
      setNeedsFullRefresh(true);
    }
  };

  handleSwipeEdges(() => setSidebarOpen(true));

  return (
    <>
      <div
        className={`app ${settings.english ? "app-eng" : "app-heb"}`}
        onDragEnter={(ev) => ev.preventDefault()}
        onDragOver={(ev) => ev.preventDefault()}>
        <div className="basad">בס"ד</div>
        <div className="icons fixed sm:top-0 top-0 sm:left-0 left-0 z-10 text-left">
          <a
            href="#"
            title={settings.english ? "Settings" : "הגדרות"}
            data-te-ripple-init={true}
            data-te-ripple-color="light"
            className="cursor-pointer p-1"
            onClick={() => setIsDrawerOpen(true)}>
            <Hamburger />
          </a>
          <a
            href="#"
            title={settings.english ? "Help" : "עזרה"}
            data-te-ripple-init={true}
            data-te-ripple-color="light"
            className="cursor-pointer p-1"
            onClick={() => setIsHelpModalOpen(true)}>
            <HelpIcon />
          </a>
        </div>
        <div className="top-section">
          <h4>
            {settings.english
              ? settings.location.Name
              : !!settings.location.NameHebrew
              ? settings.location.NameHebrew
              : settings.location.Name}
          </h4>
          {isBeinHashmashos && (
            <div className="bein-hashmashos">
              {settings.english ? "Bein Hashmashos" : "בין השמשות"}
            </div>
          )}
          <h2 className="date-text">{getDateText()}</h2>
          <h3 className="s-date-text">
            {settings.english
              ? Utils.toStringDate(sdate, false, false)
              : Utils.toShortStringDate(sdate, !settings.location.Israel)}
          </h3>
          {!!notifications?.dayNotes && notifications.dayNotes.length > 0 && (
            <div className="day-notes-inner-view">
              {notifications.dayNotes.map((n, index) => (
                <div className="day-notes-text" key={index.toString()}>
                  {n}
                </div>
              ))}
            </div>
          )}
          {!!notifications?.tefillahNotes && notifications?.tefillahNotes.length > 0 && (
            <div className="tefillah-notes-inner-view">
              {notifications.tefillahNotes.map((n, index) => (
                <div className="tefillah-notes-text" key={index.toString()}>
                  {n}
                </div>
              ))}
            </div>
          )}
          <h1 className="time-text">
            {Utils.getTimeString(currentTime, undefined, settings.armyTime)}
          </h1>
        </div>
        <div className="zmanim-section">
          <div
            className="zmanim-list"
            onDragOver={(ev) => {
              ev.preventDefault();
              ev.dataTransfer.dropEffect = "copy";
            }}
            onDragEnter={(ev) => ev.preventDefault()}
            onDrop={(ev) => appOnDrop(ev)}>
            {zmanTimes &&
              zmanTimes.map((zis, index) => (
                <SingleZman
                  key={index}
                  currenttime={currentTime}
                  zt={zis}
                  index={index}
                  itemheight={15}
                  onDragStart={(ev) =>
                    ev.dataTransfer.setData("ZmanTypeToHide", zis.zmanType.id.toString())
                  }
                  onClick={() => showFullScreen(zis)}
                  onDrag={() => setSidebarOpen(true)}
                />
              ))}
          </div>
          {isHelpModalOpen && (
            <HelpModal english={settings.english} onClose={() => setIsHelpModalOpen(false)} />
          )}
        </div>
        <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
          <SettingsChooser
            onChangeSettings={() => setNeedsFullRefresh(true)}
            onClose={() => setIsDrawerOpen(false)}
          />
        </Drawer>
      </div>{" "}
      <FullScreen
        isOpen={isFullScreenOpen}
        setIsOpen={setIsFullScreenOpen}
        gotoNextZman={() => goToNextZman()}
        zmanTime={fullScreenZman}
        currentTime={currentTime}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        onDrop={(ev) => sidebarOnDrop(ev)}
      />
    </>
  );
}
const handleSwipeEdges = (onSwipeLeft?: Function, onSwipeRight?: Function) => {
  var div = document.body;
  var mouse = {
    isDown: false,
    inLeft: false,
    inRight: false,
    downTimestamp: 0,
  };
  var width: number, thresholdStart: number, thresholdEnd: number, thresholdMilliseconds: number;

  function resize() {
    width = window.innerWidth;
    thresholdStart = 0.1 * width; //within 10% of screen width
    thresholdEnd = 0.13 * width; //beyond 13% of screen width
    thresholdMilliseconds = 500; //must be done in 500 milliseconds
  }
  document.addEventListener("resize", resize, false);
  resize(); //initialize

  div.addEventListener("mousedown", function (e) {
    var x = e.pageX;
    mouse.isDown = true;
    mouse.downTimestamp = performance.now();

    if (x < thresholdStart) {
      mouse.inLeft = true;
    } else if (x > width - thresholdStart) {
      mouse.inRight = true;
    }
  });
  div.addEventListener("mousemove", function (e) {
    var x = e.pageX;
    if (mouse.inLeft && x > thresholdEnd) {
      mouse.inLeft = false;
      if (performance.now() - mouse.downTimestamp < thresholdMilliseconds) {
        swipeEdgeFromLeft();
      }
    } else if (mouse.inRight && x < width - thresholdEnd) {
      mouse.inRight = false;
      if (performance.now() - mouse.downTimestamp < thresholdMilliseconds) {
        swipeEdgeFromRight();
      }
    }
  });
  div.addEventListener("mouseup", function (e) {
    mouse.isDown = false;
    mouse.inLeft = false;
    mouse.inRight = false;
    mouse.downTimestamp = 0;
  });

  div.addEventListener("touchstart", function (e) {
    var x = e.touches[0].pageX;
    mouse.isDown = true;
    mouse.downTimestamp = performance.now();

    if (x < thresholdStart) {
      mouse.inLeft = true;
    } else if (x > width - thresholdStart) {
      mouse.inRight = true;
    }
  });
  div.addEventListener("touchmove", function (e) {
    var x = e.touches[0].pageX;
    if (mouse.inLeft && x > thresholdEnd) {
      mouse.inLeft = false;
      if (performance.now() - mouse.downTimestamp < thresholdMilliseconds) {
        swipeEdgeFromLeft();
      }
    } else if (mouse.inRight && x < width - thresholdEnd) {
      mouse.inRight = false;
      if (performance.now() - mouse.downTimestamp < thresholdMilliseconds) {
        swipeEdgeFromRight();
      }
    }
  });
  div.addEventListener("touchend", function (e) {
    var x = e.changedTouches[0].pageX;
    mouse.isDown = false;
    mouse.inLeft = false;
    mouse.inRight = false;
    mouse.downTimestamp = 0;
  });
  function swipeEdgeFromLeft() {
    if (onSwipeLeft) onSwipeLeft();
  }
  function swipeEdgeFromRight() {
    if (onSwipeRight) onSwipeRight();
  }
};

const Hamburger = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#545454">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75L4 7.75C3.58579 7.75 3.25 7.41421 3.25 7C3.25 6.58579 3.58579 6.25 4 6.25L20 6.25C20.4142 6.25 20.75 6.58579 20.75 7Z"
        fill="#1C274C"></path>{" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12Z"
        fill="#1C274C"></path>{" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.75 17C20.75 17.4142 20.4142 17.75 20 17.75L4 17.75C3.58579 17.75 3.25 17.4142 3.25 17C3.25 16.5858 3.58579 16.25 4 16.25L20 16.25C20.4142 16.25 20.75 16.5858 20.75 17Z"
        fill="#1C274C"></path>{" "}
    </g>
  </svg>
);
const HelpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#545454"
    className="size-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
