const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

document.getElementById("title").innerHTML = "Calendar for " + currentYear + " and " + nextYear;

week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function eventTypeToColor(eventType) {
    if (eventType === "startline") {
        return "green";
    } else if (eventType === "deadline") {
        return "red";
    }
    return  "blue";
}

// Function to generate a calendar for a given year
function generateCalendar(year) {
    const months = [];
    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthDays = [];
        
        // Get the first day of the month
        const firstDay = new Date(year, month, 1).getDay();
        
        // Fill the empty spaces before the 1st of the month
        for (let i = 0; i < firstDay; i++) {
            monthDays.push(null); // Empty days
        }

        // Fill in the actual days
        for (let day = 1; day <= daysInMonth; day++) {
            monthDays.push(day);
        }

        months.push({ month, monthDays });
    }
    return months;
}

// Function to render the calendar on the page
function renderCalendar(year, elementId) {
    const months = generateCalendar(year);
    const container = document.getElementById(elementId);
    
    months.forEach((monthData, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        
        const monthName = new Date(year, index).toLocaleString('default', { month: 'long' });
        monthDiv.innerHTML = `<h3>${monthName}</h3>`;
        
        const daysDiv = document.createElement('div');
        const weekDiv = document.createElement('div');
        daysDiv.classList.add('days');
        weekDiv.classList.add('week');
        for (let i = 0; i < week.length; i++) {
            const element = week[i];
            const dayDiv = document.createElement('div');   
            dayDiv.textContent = element;
            dayDiv.classList.add('day-name');
            daysDiv.appendChild(dayDiv);       
        }
        
        
        // Add the days to the month
        monthData.monthDays.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            
            if (day !== null) {
                dayDiv.textContent = day;
                
                // Highlight today
                const today = new Date();
                if (year === today.getFullYear() && index === today.getMonth() && day === today.getDate()) {
                    dayDiv.classList.add('today');
                }
            }
            
            daysDiv.appendChild(dayDiv);
        });
        
        monthDiv.appendChild(weekDiv);
        monthDiv.appendChild(daysDiv);
        container.appendChild(monthDiv);
    });
}

// Render both this year and next year
renderCalendar(currentYear, 'this-year-months');
renderCalendar(nextYear, 'next-year-months');

function getDateParts(inputDate) {
    const date = new Date(inputDate); // Convert input to a Date object
    const year = date.getFullYear(); // Get the year
    const month = date.getMonth() + 1; // Get the month (0-based, so add 1)
    const day = date.getDate(); // Get the day of the month

    return {
        year: year,
        month: month,
        day: day
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch events from the JSON file
    fetch('https://vijaysamant4368.github.io/hashcalendar/events.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(events => {
            renderEvents(events);
        })
        .catch(error => {
            console.error('Error loading the events data:', error.message);
        });

    // Function to render the events on the page
    function renderEvents(events) {
        const calendarContainer = document.getElementById('calendar-container');
        const months = document.getElementsByClassName('month');

        // Iterate through the events and display them
        events.forEach(event => {
            const dateParts = getDateParts(event.date);
            const year = dateParts.year - currentYear;
            if (year !== 0 && year !== 1)
                return; // Skip events that are not in the current or next year
            const month = months[dateParts.month-1];
            const days = month.querySelectorAll(".day")
            var blankDays = 0
            for (let i = 0; i < days.length; i++) {
                if (days[i].textContent === "") {
                    blankDays++;
                } else {
                    break;
                }
            } 
            const day = days[dateParts.day-1 + blankDays];
            if (day === null) {
                return; // Skip days that are not in the current or next month
            }
            const event_date = day.innerHTML;
            console.log(day)

            day.innerHTML = `<a href = ${event.link}>${event_date}
                            <span class="tooltip">${event.title}</span>
                            </a>
            `;
            day.style.backgroundColor = eventTypeToColor(event.type);
                        
            // // Create and add the anchor element (the link)
            // const link = document.createElement('a');
            // link.href = event.link;
            // link.target = '_blank';
            // link.textContent = 'Click Here';
            // day.appendChild(link);


        });
    }
});