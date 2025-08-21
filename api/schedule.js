export default function handler(req, res) {
  const today = new Date();

  // Parse query params (with defaults)
  const days = parseInt(req.query.days) || 5;     // default 5
  const start = parseInt(req.query.start) || 10;  // default 10 (10 AM)
  const end = parseInt(req.query.end) || 17;      // default 17 (5 PM)

  // Generate next X days
  const dates = [];
  for (let i = 0; i < days; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    dates.push(nextDay.toISOString().split("T")[0]); // YYYY-MM-DD
  }

  // Generate time slots (hour interval)
  const times = [];
  for (let hour = start; hour <= end; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  res.status(200).json({ dates, times });
}