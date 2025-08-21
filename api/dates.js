export default function handler(req, res) {
  const today = new Date();
  const days = parseInt(req.query.days) || 5; // default 5

  const dates = [];
  for (let i = 1; i <= days; i++) { // start from tomorrow
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const formatted = nextDay.toISOString().split("T")[0]; // YYYY-MM-DD
    dates.push(formatted);
  }

  res.status(200).json({ dates });
}
