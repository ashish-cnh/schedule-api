export default function handler(req, res) {
  const today = new Date();
  const days = parseInt(req.query.days) || 5; // default 5

  const dates = [];
  for (let i = 1; i <= days; i++) { // start from tomorrow
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const day = String(nextDay.getDate()).padStart(2, "0");
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const year = nextDay.getFullYear();
    dates.push(`${day}-${month}-${year}`); // DD-MM-YYYY format
  }

  res.status(200).json({ dates });
}
