# Zman Clock

Zman Clock is a customizable countdown clock for all the Daily Zmanim and all time related Halachic information.
It is a React single page web site, that is compiled using vite.
It is written in Typescript and uses Tailwind css classes.
The Zmanim calculations are done by jcal-zmanim.

You can preview a working copy of Zman Clock at [https://www.compute.co.il/zman-clock/](https://www.compute.co.il/zman-clock/)

Zman Clock is a Halachic Zmanim clock that shows a list of upcoming Zmanim and how much time remains until that Zman.

Zman Clock also shows:

1.  The current Jewish date. Note that at sunset, the Jewish date changes to the next day.
2.  The current civil date. The civil date changes at midnight.
3.  A extensive list of daily Halachic information, such as Rosh Chodesh, Yom Tov etc.
4.  A list of daily relevant notifications specific for Tefillah. Such as Yaaleh Veyavo, Sefiras Haomer and many, many more. For example, when there is Bircas Hachodesh, the correct time of the Molad will be shown for announcing in Shul.

Zman Clock has a default list of which Zmanim to show, but this list is fully customizable.

Adding and removing from the list of Zmanim can be done in two ways:

1.  By Dragging from the list of Zmanim on the left. To show this list, swipe from the left side of the screen. The list of Zmanim that are not currently active will then appear. You can drag from this list to the center section to activate Zmanim. You can also drag from the zmanim being shown in the cneter section to the list on the side to de-activate any Zmanim.
2.  By opening the Settings section by pressing or clicking on the Settings icon in the top left corner, and then toggling the Zman you wish to show or hide.

You can also have Zman Clock show a large countdown to a particular Zman, by pressing or clicking on any Zman being shown in the center section.

The Zmanim shown are for the location set in the Settings, and the time is taken from the current system.

In the settings section, you can set:

*   The application language.
*   The current location - choose from a vast list of locations, almost anywhere in the world.
*   Whether or not to show the Daily Halachic notifications.
*   Whether or not to show the daily Daf Yomi
*   Which style time to show - regular (12 hour AM/PM) or army (24 hour)
*   Whether or not to show the Shir Shel Yom of the Gr”a.
*   How many minutes after an active Zman has past to continue showing the notification.
*   The maximum number of Zmanim to be shown at one time.
