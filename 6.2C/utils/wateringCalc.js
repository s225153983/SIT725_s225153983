/**
 * Calculates how many days until the next watering is due.
 * - lastWateredDaysAgo: number of days since last watering (0+)
 * - intervalDays: watering interval in days (1+)
 *
 * Returns:
 *  - 0 if watering is due today
 *  - positive integer for days remaining
 */
function daysUntilNextWatering(lastWateredDaysAgo, intervalDays) {
  const last = Number(lastWateredDaysAgo);
  const interval = Number(intervalDays);

  if (!Number.isFinite(last) || !Number.isFinite(interval)) {
    throw new Error("Inputs must be numbers");
  }
  if (last < 0) throw new Error("lastWateredDaysAgo must be >= 0");
  if (interval <= 0) throw new Error("intervalDays must be > 0");

  const remaining = interval - last;

  // If remaining <= 0, watering is due now
  return remaining <= 0 ? 0 : Math.ceil(remaining);
}

module.exports = { daysUntilNextWatering };
