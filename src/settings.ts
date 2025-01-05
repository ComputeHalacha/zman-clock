import { Location, findLocation, ZmanTypeIds, getZmanType, Utils, Zmanim } from "jcal-zmanim";
import type { ZmanToShow } from "jcal-zmanim";

export default class Settings {
  zmanimToShow: ZmanToShow[];
  customZmanim: ZmanToShow[];
  location: Location;
  showNotifications: boolean;
  numberOfItemsToShow: number;
  minToShowPassedZman: number;
  showGaonShir: boolean;
  theme: string;
  showDafYomi: boolean;
  english: boolean;
  armyTime: boolean;
  autoTheme: boolean;
  /**
   *
   * @param {[{id:Number, offset: ?Number, whichDaysFlags:?Number, desc: String, eng: String, heb: String }]} [zmanimToShow] List of which zmanim to show
   * @param {[{id:Number, offset: Number, whichDaysFlags: Number }]} [customZmanim] List of which zmanim were added
   * @param {Location} [location]
   * @param {boolean} [showNotifications] Show shul notifications?
   * @param {number} [numberOfItemsToShow] Number of zmanim to show on the main screen
   * @param {number} [minToShowPassedZman] Number of minutes to continue showing zmanim that have passed
   * @param {boolean} [showGaonShir] Show the Shir Shel Yom of the Gr"a?
   * @param {string} [theme] The name of the theme
   * @param {boolean} [showDafYomi] Show the Daf Yomi?
   * @param {boolean} [english] Show in English?
   * @param {boolean} [armyTime] Time in Army Time format?
   * @param {boolean} [autoTheme] Should the color scheme be set automtatically?
   */
  constructor(
    zmanimToShow?: ZmanToShow[],
    customZmanim?: ZmanToShow[],
    location?: Location,
    showNotifications?: boolean,
    numberOfItemsToShow?: number,
    minToShowPassedZman?: number,
    showGaonShir?: boolean,
    theme?: string,
    showDafYomi?: boolean,
    english?: boolean,
    armyTime?: boolean,
    autoTheme?: boolean
  ) {
    /**
     * @property {[{id:Number, offset: ?Number, whichDaysFlags:?Number, desc: String, eng: String, heb: String }]} zmanimToShow List of which zmanim to show
     */
    this.zmanimToShow = (zmanimToShow as ZmanToShow[]) || [
      getZmanType(ZmanTypeIds.ChatzosLayla), //chatzosNight
      getZmanType(ZmanTypeIds.Alos72), //alos72
      getZmanType(ZmanTypeIds.TalisTefillin), //talisTefillin
      getZmanType(ZmanTypeIds.NetzMishor), //netzMishor
      getZmanType(ZmanTypeIds.szksMga), //szksMga
      getZmanType(ZmanTypeIds.szksGra), //szksGra
      getZmanType(ZmanTypeIds.sztMga), //sztMga
      getZmanType(ZmanTypeIds.sztGra), //sztGra
      getZmanType(ZmanTypeIds.chatzosDay), //chatzosDay
      getZmanType(ZmanTypeIds.minGed), //minGed
      getZmanType(ZmanTypeIds.minKet), //minKet
      getZmanType(ZmanTypeIds.plag), //plag
      getZmanType(ZmanTypeIds.shkiaElevation), //shkiaElevation
      getZmanType(ZmanTypeIds.tzais50), //tzais50
      getZmanType(ZmanTypeIds.tzais72), //tzais72
      getZmanType(ZmanTypeIds.candleLighting), //candleLighting
      getZmanType(ZmanTypeIds.SofZmanEatingChometz), //Sof Zman eating Chometz
      getZmanType(ZmanTypeIds.SofZmanBurnChometz), //Sof Zman burn Chometz
    ];
    /**
     * @property {[{id:Number, offset: Number, whichDaysFlags: Number, desc: String, eng: String, heb: String }]} customZmanim List of added zmanim
     * Note: the id needs to be one of the ids of ZmanTypes list in the file ZmanTypes.js
     * The offset is the number of minutes to be added/subtracted to this ZmanType.
     * The whichDaysFlags is an integer which contains a bit-flag of WhichDaysFlags values (contained in AppUtils.js)
     */
    this.customZmanim = customZmanim || [];
    /**
     * @property {Location} location
     */
    this.location = (location as Location) || findLocation("Lakewood NJ");
    /**
     * @property {boolean} showNotifications Show shul notifications?
     */
    this.showNotifications = !!Utils.setDefault(showNotifications, true);
    /**
     * @property {number} numberOfItemsToShow Number of zmanim to show on the main screen
     */
    this.numberOfItemsToShow = Utils.setDefault(numberOfItemsToShow, 5) as number;
    /**
     * @property {number} minToShowPassedZman Number of minutes to continue showing zmanim that have passed
     */
    this.minToShowPassedZman = Utils.setDefault(minToShowPassedZman, 15) as number;
    /**
     * @property {boolean} [showGaonShir] Show the Shir Shel Yom of the Gr"a?
     */
    this.showGaonShir = !!Utils.setDefault(showGaonShir, false);
    /**
     * @property {string} [theme] name of the style theme
     */
    this.theme = theme || "system";
    /**
     * @property {boolean} [showDafYomi] Show Daf Yomi?
     */
    this.showDafYomi = !!Utils.setDefault(showDafYomi, true);
    /**
     * @property {boolean} [english] Should the language be English?
     */
    this.english = !!Utils.setDefault(english, true);
    /**
     * @property {boolean} [armyTime] Should the time displyed be Army Time?
     */
    this.armyTime = !!Utils.setDefault(armyTime, false);
    /**
     * @property {boolean} [autoTheme]  Should the color scheme be set automtatically?
     */
    this.autoTheme = !!Utils.setDefault(autoTheme, true);
  }
}

/**
 * @param settings
 * @returns A full clone of the given Setting object
 */
export const clone = (settings: Settings): Settings =>
  new Settings(
    [...settings.zmanimToShow],
    [...settings.customZmanim],
    settings.location,
    settings.showNotifications,
    settings.numberOfItemsToShow,
    settings.minToShowPassedZman,
    settings.showGaonShir,
    settings.theme,
    settings.showDafYomi,
    settings.english,
    settings.armyTime,
    settings.autoTheme
  );
