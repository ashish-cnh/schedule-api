function formatTime(date, hour) {
  const slot = new Date(date);
  slot.setHours(hour, 0, 0, 0);

  const day = String(slot.getDate()).padStart(2, '0');
  const month = String(slot.getMonth() + 1).padStart(2, '0');
  const year = slot.getFullYear();

  let hour12 = slot.getHours() % 12 || 12;
  const ampm = slot.getHours() >= 12 ? 'PM' : 'AM';

  return `${day}-${month}-${year} ${hour12.toString().padStart(2, '0')}:00-${ampm}`;
}

export default function handler(req, res) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Handle date parameter
  let dateParam = req.query.date;
  let selectedDate;

  if (!dateParam || dateParam.startsWith('dt-')) {
    const offset = parseInt(dateParam?.split('-')[1], 10) || 1;
    selectedDate = new Date(today);
    selectedDate.setDate(today.getDate() + offset);
  } else {
    // Expect explicit date in DD-MM-YYYY
    const [dd, mm, yyyy] = dateParam.split('-').map(Number);
    selectedDate = new Date(yyyy, mm - 1, dd);
  }

  const start = parseInt(req.query.start, 10) || 10;
  const end = parseInt(req.query.end, 10) || 17;

  const times = [];
  for (let hour = start; hour <= end; hour++) {
    times.push(formatTime(selectedDate, hour));
  }

  res.status(200).json({
    date: `${String(selectedDate.getDate()).padStart(2, '0')}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`,
    times
  });
}
