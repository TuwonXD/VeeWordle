/**
 * Calendar utilities for downloading .ics file and creating Google Calendar link
 */

export function downloadIcsFile(event) {
  const {
    title = "Our Date 💗",
    description = "Celebrating our 1st month of being together officially! Matcha -> Food trip -> Movies -> Pop-ups at Nuvali -> Photobooth!",
    location = "Nuvali & our favorite date spots",
    date = "2026-11-03", // YYYY-MM-DD
  } = event;

  // Format dates: YYYYMMDD
  const startDateStr = date.replace(/-/g, "");
  // For all day event, DTEND is the next day
  const nextDay = new Date(date + "T00:00:00");
  nextDay.setDate(nextDay.getDate() + 1);
  const year = nextDay.getFullYear();
  const month = String(nextDay.getMonth() + 1).padStart(2, "0");
  const day = String(nextDay.getDate()).padStart(2, "0");
  const endDateStr = `${year}${month}${day}`;

  const cleanDescription = description.replace(/\n/g, "\\n");
  const cleanLocation = location.replace(/,/g, "\\,");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VeeWordle//Romantic Date Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:veewordle-${Date.now()}@veewordle.love`,
    `DTSTAMP:${startDateStr}T000000Z`,
    `DTSTART;VALUE=DATE:${startDateStr}`,
    `DTEND;VALUE=DATE:${endDateStr}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Our romantic date tomorrow! 💗",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "OurDate-November3-2026.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event) {
  const {
    title = "Our Date 💗",
    description = "Celebrating our 1st month of being together officially! Matcha -> Food trip -> Movies -> Pop-ups at Nuvali -> Photobooth!",
    location = "Nuvali & our favorite date spots",
    date = "2026-11-03",
  } = event;

  const startDateStr = date.replace(/-/g, "");
  const nextDay = new Date(date + "T00:00:00");
  nextDay.setDate(nextDay.getDate() + 1);
  const year = nextDay.getFullYear();
  const month = String(nextDay.getMonth() + 1).padStart(2, "0");
  const day = String(nextDay.getDate()).padStart(2, "0");
  const endDateStr = `${year}${month}${day}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${startDateStr}/${endDateStr}`,
    details: description,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

