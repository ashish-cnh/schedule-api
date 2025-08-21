function formatTime(date, hour) {
  const slot = new Date(date);
  slot.setHours(hour, 0, 0, 0);

  const day = String(slot.getDate()).padStart(2, "0");
  const month = String(slot.getMonth() + 1).padStart(2, "0");
  const year = slot.getFullYear();

  let hour12 = slot.getHours() % 12 || 12;
  const ampm = slot.getHours() >= 12 ? "PM" : "AM";

  return `${day}-${month}-${year} ${hour12.toString().padStart(2, "0")}:00-${ampm}`;
}

export default function handler(req, res) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Params
  const dateParam = req.query.date || `${String(tomorrow.getDate()).padStart(2,"0")}-${String(tomorrow.getMonth()+1).padStart(2,"0")}-${tomorrow.getFullYear()}`; // DD-MM-YYYY
  const [day, month, year] = dateParam.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);

  const start = parseInt(req.query.start) || 10;
  const end = parseInt(req.query.end) || 17;

  const times = [];
  for (let hour = start; hour <= end; hour++) {
    times.push(formatTime(selectedDate, hour));
  }

  res.status(200).json({ date: dateParam, times });
}
