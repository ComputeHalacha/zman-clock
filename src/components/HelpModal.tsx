interface HelpModalProps {
  onClose: () => void;
  english?: boolean;
}

export default function HelpModal({ english, onClose }: HelpModalProps) {
  const hebrew = !english;
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>
      <div
        className={`bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full text-${
          english ? "left" : "right"
        }`}>
        <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-500">
            {english ? "Zman Clock" : "שעון זמנים"}
          </h3>
          <div className="mt-2 text-sm text-gray-300">
            {english ? (
              <>
                <p>Zman Clock is a Zmanim countdown clock.</p>
                <p>It shows the time remaining until the next Zman.</p>
                <p>It also shows the time of the Zman.</p>
                <p>It is based on the location of the device.</p>
                <p>It is based on the time of the device.</p>
                <p>It is based on the timezone of the device.</p>
                <p>It is based on the daylight saving time of the device.</p>
                <p>It is based on the Zmanim of the device.</p>
                <p>It is based on the Zmanim of the location.</p>
                <p>It is based on the Zmanim of the timezone.</p>
                <p>It is based on the Zmanim of the daylight saving time.</p>
                <p>It is based on the Zmanim of the Zmanim.</p>
                <p>It is based on the Zmanim of the Zmanim.</p>
                <p>It is based on the Zmanim of the Zmanim.</p>
                <p>It is based on the Zmanim of the Zmanim.</p>

                <p></p>
              </>
            ) : (
              <>
                <p>שעון זמן הוא שעון חשבון זמנים.</p>
                <p>הוא מראה את הזמן הנותר עד הזמן הבא.</p>
                <p>הוא מראה גם את הזמן של הזמן.</p>
                <p>הוא מבוסס על מיקום המכשיר.</p>
                <p>הוא מבוסס על הזמן של המכשיר.</p>
                <p>הוא מבוסס על אזור הזמן של המכשיר.</p>
                <p>הוא מבוסס על שעון הקיץ של המכשיר.</p>
                <p>הוא מבוסס על זמנים של המכשיר.</p>
                <p>הוא מבוסס על זמנים של המיקום.</p>
                <p>הוא מבוסס על זמנים של אזור הזמן.</p>
                <p>הוא מבוסס על זמנים של שעון הקיץ.</p>
                <p>הוא מבוסס על זמנים של זמנים.</p>
                <p>הוא מבוסס על זמנים של זמנים.</p>
              </>
            )}
          </div>
        </div>
        <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose && (() => onClose())}>
            {english ? "Close" : "סגור"}
          </button>
        </div>
      </div>
    </div>
  );
}
