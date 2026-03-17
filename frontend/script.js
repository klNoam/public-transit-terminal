function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]}/${now.getDate()}/${now.getFullYear()}`;
  
  document.getElementById('clock').innerHTML = `
    <span id="time">${displayHours}:${minutes} ${ampm}</span>
    <span id="date">${dateStr}</span>`;
}

function fetchSchedule() {
  fetch("http://127.0.0.1:5001/api/schedule1")
    .then(res => res.json())
    .then(data => {
        const stops = data[0];
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            const upcomingTrips = data.slice(1).filter(row => {
            const time = row[7];
            return time && time >= currentTime;
        }).slice(0, 3);
        const routeDiv = document.getElementById('route1');
        routeDiv.innerHTML = `<h2>Campus Connector</h2>
        <div id="arrows">
            ${stops.slice(stops.indexOf('Regents Drive Garage'), stops.indexOf('Regents Drive Garage') + 5).map((stop, i) => `
                <div class="stop">
                    <div class="stop-name">${stop}</div>
                    <div class="stop-time">${upcomingTrips[0] ? upcomingTrips[0][stops.indexOf('Regents Drive Garage') + i] : ''}</div>
                </div>
            `).join('')}
            <div class="stop empty-stop"></div>
            <div class="stop empty-stop"></div>
            <div class="stop">
                <div class="stop-name">${stops[stops.length - 1]}</div>
                <div class="stop-time">${upcomingTrips[0] ? upcomingTrips[0][stops.length - 1] : ''}</div>
            </div>
        </div>`;
    });

    fetch("http://127.0.0.1:5001/api/schedule2")
    .then(res => res.json())
    .then(data => {
        const stops = data[0];
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
            const upcomingTrips = data.slice(1).filter(row => {
            const time = row[0];
            return time && time >= currentTime;
        }).slice(0, 3);
        const routeDiv = document.getElementById('route2');
        routeDiv.innerHTML = `<h2>College Park Metro</h2>
        <div id="arrows">
            ${stops.slice(stops.indexOf('Regents Drive Garage'), stops.indexOf('Regents Drive Garage') + 5).map((stop, i) => `
                <div class="stop">
                    <div class="stop-name">${stop}</div>
                    <div class="stop-time">${upcomingTrips[0] ? upcomingTrips[0][stops.indexOf('Regents Drive Garage') + i] : ''}</div>
                </div>
            `).join('')}
            <div class="stop empty-stop"></div>
            <div class="stop empty-stop"></div>
            <div class="stop">
                <div class="stop-name">${stops[stops.length - 1]}</div>
                <div class="stop-time">${upcomingTrips[0] ? upcomingTrips[0][stops.length - 1] : ''}</div>
            </div>
        </div>`;
    });
}

fetchSchedule();
updateClock();
setInterval(updateClock, 1000);