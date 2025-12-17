const expect = require("chai").expect;
const { daysUntilNextWatering } = require("../utils/wateringCalc");

describe("Watering calculation (daysUntilNextWatering)", function () {
  it("Valid: 2 days since watering, interval 7 => 5 days remaining", function () {
    expect(daysUntilNextWatering(2, 7)).to.equal(5);
  });

  it("Edge: lastWateredDaysAgo equals interval => due today (0)", function () {
    expect(daysUntilNextWatering(7, 7)).to.equal(0);
  });

  it("Invalid: negative lastWateredDaysAgo throws", function () {
    expect(() => daysUntilNextWatering(-1, 7)).to.throw();
  });
});
