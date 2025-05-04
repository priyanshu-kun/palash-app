export function formatTime(minutes: number): string {
  // Handle edge cases
  if (minutes < 0) return "Invalid time";
  if (minutes === 0) return "0 minutes";
  
  // Constants for time conversions
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;
  const DAYS_IN_WEEK = 7;
  const DAYS_IN_MONTH = 30; // Approximation
  
  // Calculate time units
  let remainingMinutes = minutes;
  
  const months = Math.floor(remainingMinutes / (MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_MONTH));
  remainingMinutes %= (MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_MONTH);
  
  const weeks = Math.floor(remainingMinutes / (MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_WEEK));
  remainingMinutes %= (MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_WEEK);
  
  const days = Math.floor(remainingMinutes / (MINUTES_IN_HOUR * HOURS_IN_DAY));
  remainingMinutes %= (MINUTES_IN_HOUR * HOURS_IN_DAY);
  
  const hours = Math.floor(remainingMinutes / MINUTES_IN_HOUR);
  remainingMinutes %= MINUTES_IN_HOUR;
  
  // Build the result string
  const parts = [];
  
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  }
  
  if (weeks > 0) {
    parts.push(`${weeks} ${weeks === 1 ? 'week' : 'weeks'}`);
  }
  
  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }
  
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }
  
  if (remainingMinutes > 0) {
    parts.push(`${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'}`);
  }
  
  // Return the formatted string
  return parts.length > 0 ? parts.join(' ') : '0 minutes';
}
