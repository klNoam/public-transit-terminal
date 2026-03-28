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

        //loop to fetch the row of the current time
        let rowIndex;
        for (let i = 1; i < data.length; i++) {
            if (data[i][9].padStart(5, '0') >= currentTime) {
                rowIndex = i;
                break;
            }
        }

        let i = 8;
        while(data[rowIndex][i] > currentTime){
            i--;
        }
        const currentStop = data[rowIndex][i] === '' ? 'NOT RUNNING YET' : stops[i];

        const upcomingTrips = data[rowIndex].slice(9, 16);
        const routeDiv = document.getElementById('route1');
        routeDiv.innerHTML = `<h2>Campus Connector - Current Stop: ${currentStop}</h2>
        <div id="arrows">
            ${stops.slice(stops.indexOf('Regents Drive Garage'), stops.indexOf('Regents Drive Garage') + 7).map((stop, i) => `
                <div class="stop">
                    <div class="stop-name">${stop}</div>
                    <div class="stop-time">${upcomingTrips[i]}</div>
                </div>
            `).join('')}
        </div>`;
    });

    fetch("http://127.0.0.1:5001/api/schedule2")
    .then(res => res.json())
    .then(data => {
        const stops = data[0];
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        //loop to fetch the row of the current time
        let rowIndex;
        for (let i = 1; i < data.length; i++) {
            if (data[i][22].padStart(5, '0') >= currentTime) {
                rowIndex = i;
                break;
            }
        }

        let i = 21;
        while(data[rowIndex][i] > currentTime){
            i--;
        }

       let currentStop = data[rowIndex][i] === '' ? 'NOT RUNNING YET' : stops[i];
        
       let newRowIndex = rowIndex;
       if(currentTime > "23:00" && data[rowIndex][i] === ''){
            newRowIndex --;
            i = 27;
            while(data[newRowIndex][i] > currentTime){
                i--;
            }
            currentStop = stops[i];
        }

        const upcomingTrips = data[rowIndex].slice(21, 28);
        const routeDiv = document.getElementById('route2');
        routeDiv.innerHTML = `<h2>College Park Metro - Current Stop: ${currentStop}</h2>
        <div id="arrows">
            ${stops.slice(stops.indexOf('Regents Drive Garage'), stops.indexOf('Regents Drive Garage') + 7).map((stop, i) => `
                <div class="stop">
                    <div class="stop-name">${stop}</div>
                    <div class="stop-time">${upcomingTrips[i]}</div>
                </div>
            `).join('')}
        </div>`;
    });
}

fetchSchedule();
updateClock();
setInterval(updateClock, 1000);