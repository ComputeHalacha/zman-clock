import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import App from "./index";
import { jDate, Zmanim } from "jcal-zmanim";
import React from "react";

// Mock settings
vi.mock("../settingsContext", () => ({
  useSettingsData: () => ({
    settings: {
      location: {
        Name: "Test Location",
        Latitude: 40.0,
        Longitude: -74.0,
        TimeZone: "America/New_York",
      },
      english: true,
      showNotifications: true,
      zmanimToShow: [],
      minToShowPassedZman: 15,
      autoTheme: false,
      theme: "light",
      armyTime: false,
    },
    getCurrentDateTime: () => new Date(),
    applyColorTheme: vi.fn(),
    setSettings: vi.fn(),
    resetZmanimToShowSettings: vi.fn(),
    getCurrentTheme: vi.fn().mockReturnValue("light"),
  }),
}));

describe("App Date Change Logic", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval", "Date"],
      shouldAdvanceTime: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("updates Jewish date correctly after sunset", async () => {
    const initialDate = new Date("2024-03-20T17:59:50");
    vi.setSystemTime(initialDate);

    // Ensure mock value has shape of Time { hour, minute, second, millisecond }
    // We assume jcal-zmanim works with plain objects for calculation if methods not used.
    const mockSunset = { hour: 18, minute: 0, second: 0, millisecond: 0 };
    vi.spyOn(Zmanim, "getSunTimes").mockReturnValue({
      sunrise: { hour: 6, minute: 0, second: 0, millisecond: 0 },
      sunset: mockSunset,
      dawn: { hour: 5, minute: 0, second: 0, millisecond: 0 },
      dusk: { hour: 19, minute: 0, second: 0, millisecond: 0 },
    } as any);

    render(<App />);

    // Initial check
    const jdBefore = new jDate(initialDate);
    const dateTextBefore = jdBefore.toString();
    expect(await screen.findByText(dateTextBefore)).toBeInTheDocument();

    // Advance time
    act(() => {
      // Advance system time manually as well to ensure Date() constructor returns new time
      const newTime = new Date(initialDate.getTime() + 30000);
      vi.setSystemTime(newTime);
      vi.advanceTimersByTime(30000); // 30 seconds
    });

    // Check next day
    const jdAfter = jdBefore.addDays(1);
    const dateTextAfter = jdAfter.toString();

    // Use findByText again to allow for async update
    expect(await screen.findByText(dateTextAfter)).toBeInTheDocument();
  });

  it("updates Secular date correctly after midnight", async () => {
    const initialDate = new Date("2024-03-20T23:59:50");
    vi.setSystemTime(initialDate);

    const mockSunset = { hour: 18, minute: 0, second: 0, millisecond: 0 };
    vi.spyOn(Zmanim, "getSunTimes").mockReturnValue({
      sunrise: { hour: 6, minute: 0, second: 0, millisecond: 0 },
      sunset: mockSunset,
      dawn: { hour: 5, minute: 0, second: 0, millisecond: 0 },
      dusk: { hour: 19, minute: 0, second: 0, millisecond: 0 },
    } as any);

    render(<App />);

    // Format is like "Wednesday, the 20th of March 2024"
    expect(await screen.findByText(/20.*March.*2024/i)).toBeInTheDocument();

    act(() => {
      const newTime = new Date(initialDate.getTime() + 30000);
      vi.setSystemTime(newTime);
      vi.advanceTimersByTime(30000); // -> March 21
    });

    expect(await screen.findByText(/21.*March.*2024/i)).toBeInTheDocument();
  });
});
