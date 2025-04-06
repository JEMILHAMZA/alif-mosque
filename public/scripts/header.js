// custom script  for the header //////////////////////////////////////////////////////////////////////////////
async function fetchPrayerTimes() {
  const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Addis%20Ababa&country=Ethiopia&method=2');
  const data = await response.json();
  const timings = data.data.timings;

  document.getElementById('fajr-time').textContent = timings.Fajr;
  document.getElementById('sunrise-time').textContent = timings.Sunrise;
  document.getElementById('zuhr-time').textContent = timings.Dhuhr;
  document.getElementById('asr-time').textContent = timings.Asr;
  document.getElementById('maghrib-time').textContent = timings.Maghrib;
  document.getElementById('isha-time').textContent = timings.Isha;
}

async function fetchDates() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  const formattedDate= `${day}-${month}-${year}`
  // const date= new Date().getDate();
  const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${formattedDate}`);
  const data = await response.json();
  const gregorianDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  // Formatting the Hijri date
  const hijriDateData = data.data.hijri;
  const hijriDay = hijriDateData.day;
  const hijriMonth = hijriDateData.month.en;
  const hijriYear = hijriDateData.year;
  const hijriDate = `${hijriMonth} ${hijriDay}, ${hijriYear}`;

  document.getElementById('gregorian-date').textContent = gregorianDate;
  document.getElementById('hijri-date').textContent = hijriDate;
}

fetchPrayerTimes();
fetchDates();
