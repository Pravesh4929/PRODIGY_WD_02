let startTime, updatedTime, difference, timerInterval;
let isRunning = false;

const modeToggle = document.getElementById('modeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');



// Toggle Dark Mode and Switch Icons
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  
  // Show/hide sun and moon icons
  const isDarkMode = document.body.classList.contains('dark-mode');
  sunIcon.style.display = isDarkMode ? 'none' : 'inline';
  moonIcon.style.display = isDarkMode ? 'inline' : 'none';
});


// Update live date and time
function updateDateTime() {
  const now = new Date();
  document.getElementById('currentDate').textContent = `Date: ${now.toLocaleDateString()}`;
  document.getElementById('currentTime').textContent = `Time: ${now.toLocaleTimeString()}`;
}
setInterval(updateDateTime, 1000);

// Start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    startTime = new Date() - (difference || 0);
    timerInterval = setInterval(updateStopwatch, 10);
    isRunning = true;
  }
}

// Stop the stopwatch
function stopStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  difference = 0;
  document.getElementById('stopwatch').textContent = "00:00:00.00";
}

// Update stopwatch display
function updateStopwatch() {
  updatedTime = new Date();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  document.getElementById('stopwatch').textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

// Helper function to add leading zeros
function pad(number, digits = 2) {
  return number.toString().padStart(digits, '0');
}
