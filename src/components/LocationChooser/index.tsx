import { useState } from "react";
import { Location, Locations } from "jcal-zmanim";
import CloseButton from "../CloseButton";

type locationChooserProps = {
  location: Location;
  eng: boolean;
  onChangeLocation: Function;
  onClose: Function;
};
export default function LocationChooser({ eng, onChangeLocation, onClose }: locationChooserProps) {
  const [list, setList] = useState(Locations);
  return (
    <main className="max-w-screen-sm min-w-fit transform ease-in-out" onClick={() => onClose()}>
      <section>
        <article className="flex justify-between flex-row align-top p-2">
          <header className="p-4 font-bold text-2xl flex-1 text-center  text-[#955]">
            {eng ? "Choose Location" : "בחר מקום"}
          </header>
          <CloseButton onClick={() => onClose()} />
        </article>
      </section>
      <section className="m-3 w-5/6">
        <input
          type="text"
          className="p-3 w-full rounded"
          placeholder={eng ? "Filter" : "חפש"}
          style={{ direction: eng ? "ltr" : "rtl" }}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            setList(
              Locations.filter((l) =>
                `${l.Name} ${!!l.NameHebrew ? "  " + l.NameHebrew : ""}`
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            )
          }
        />
      </section>
      <section className="h-full flex flex-col m-3">
        {list.map((loc) => (
          <div
            className="px-4 py-2 mb-1.5 bg-[#212223] text-gray-400 text-left  cursor-pointer"
            key={loc.Name}
            onClick={(e) => {
              e.stopPropagation();
              onChangeLocation(loc);
            }}>
            {eng ? loc.Name : loc.NameHebrew || loc.Name}
          </div>
        ))}
      </section>
    </main>
  );
}
