import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Airbnb Search", () => {
  it("should search for a place in Austin, TX for 2 guests for September 20 to 27", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://www.airbnb.com/s/Austin--TX/homes" });

    const gotItButtons = await testdriver.findAll("\"Got it\" button on the pricing popup");
    if (gotItButtons.length > 0) {
      await gotItButtons[0].click();
    }

    const datesButton = await testdriver.find("\"Any week\" in the search bar");
    await datesButton.click();

    const checkInDate = await testdriver.find("Sunday, September 20, 2026");
    await checkInDate.click();

    const checkOutDate = await testdriver.find("Sunday, September 27, 2026");
    await checkOutDate.click();

    const addGuests = await testdriver.find("\"Add guests\" button in the search bar");
    await addGuests.click();

    const plusAdults = await testdriver.find("plus button next to Adults");
    await plusAdults.click();
    await plusAdults.click();

    const searchButton = await testdriver.find("Search button with magnifying glass");
    await searchButton.click();

    // Wait for search results to load and update search bar
    await testdriver.find("\"Sep 20 – 27\" in the search bar", { timeout: 30000 });

    const assertResult = await testdriver.assert("Search results are displayed for Austin with dates Sep 20 - 27 and 2 guests");
    expect(assertResult).toBeTruthy();
  });
});
