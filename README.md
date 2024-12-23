# Zman Clock


Zman Clock is a customizable countdown clock for all the Daily Zmanim and all time related Halachic information.

It is a React single page web site, that is compiled with Vite.

It is written in Typescript and uses Tailwind css classes.

The Zmanim calculations are done using [jcal-zmanim](https://github.com/cbsom/jcal-zmanim).

## Features

- Calculates daily zmanim based on user location
- Displays sunrise and sunset times
- Provides a variety of halachic times throughout the day

You can preview a working copy of Zman Clock at [https://www.compute.co.il/zman-clock/](https://www.compute.co.il/zman-clock/)

Zman Clock is a Halachic Zmanim clock that shows a list of upcoming Zmanim and how much time remains until that Zman.

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
*   The theme - choose between system, light, and dark themes.

## Installation

# Installation Instructions

Follow the steps below to install the application:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ComputeHalacha/zman-clock.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd zman-clock
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Build the Application**

    ```bash
    npm run build
    ```

5. **Run the Application**

    ```bash
    npm run dev
    ```

6. **Access the Application**

    Open your web browser and navigate to [`http://localhost:3000`](http://localhost:3000) to use the application.

---

## Usage

To use **Zman Clock**, follow these steps:

1. **Open the Application**

    - If running locally, open your web browser and navigate to [`http://localhost:3000`](http://localhost:3000).
    - If using the online version, visit [https://www.compute.co.il/zman-clock/](https://www.compute.co.il/zman-clock/).

        **Zman Clock will display the following information:**

        - The current Jewish date. Note that at sunset, the Jewish date changes to the next day.
        - The current civil date. The civil date changes at midnight.
        - A extensive list of daily Halachic information, such as Rosh Chodesh, Yom Tov etc.
        - A list of daily relevant notifications specific for Tefillah. Such as Yaaleh Veyavo, Sefiras Haomer and many, many more. For example, when there is Bircas Hachodesh, the correct time of the Molad will be shown for announcing in Shul.

2. **Set Your Location**

    - Click the **Settings** icon in the top left corner.
    - Under **Location**, choose your current location from the list to ensure accurate zmanim calculations.

3. **Customize Displayed Zmanim**

    - **Using Drag and Drop:**
      - Swipe from the left side of the screen to reveal the list of available zmanim.
      - Drag zmanim from the side list to the center to activate them.
      - To deactivate, drag zmanim from the center back to the side list.
    - **Using Settings:**
      - In the **Settings** menu, toggle the zmanim you wish to show or hide.

4. **View Countdown to a Specific Zman**

    - Click on any displayed zman in the center section to view a large countdown timer for that zman.

5. **Adjust Additional Settings**

    - **Language:** Set your preferred application language.
    - **Notifications:** Enable or disable daily halachic notifications and the daily Daf Yomi.
    - **Time Format:** Choose between 12-hour (AM/PM) or 24-hour time formats.
    - **Shir Shel Yom:** Opt to show or hide the Shir Shel Yom of the Gr”a.
    - **Zmanim Display Options:**
      - Set how long to display a zman after it has passed.
      - Define the maximum number of zmanim to display at once.
    - **Theme:** Choose between system, light, and dark themes.

6. **Access Additional Information**

    - View the current Jewish date, which changes at sunset.
    - Access daily halachic information such as Rosh Chodesh and Yom Tov.
    - Receive relevant tefillah notifications like Yaaleh Veyavo and Sefiras Haomer.

Enjoy using Zman Clock to keep track of important halachic times throughout the day!

## License

This project is licensed under the [GNU AGPL](LICENSE). See the [LICENSE](LICENSE) file for details.
