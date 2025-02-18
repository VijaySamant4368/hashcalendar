const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

document.getElementById("title").innerHTML = "Calendar for " + currentYear + " and " + nextYear;

week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
