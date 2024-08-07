let startTime, updatedTime, difference, tInterval, running = false;
const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

function start() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateStopwatch, 1000 / 60); 
        running = true;
    startButton.textContent = 'Lap';
    startButton.classList.add('bg-blue-500');
  } else {
    recordLap();
  }
}

function pause() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    startButton.textContent = 'Start';
    startButton.classList.remove('bg-blue-500');
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.textContent = '00:00:00';
  startButton.textContent = 'Start';
  startButton.classList.remove('bg-blue-500');
  laps.innerHTML = '';
  resetHands();
}

function recordLap() {
  const lapTime = document.createElement('li');
  lapTime.textContent = display.textContent;
  laps.appendChild(lapTime);
}

function updateStopwatch() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  display.textContent = (hours > 9 ? hours : "0" + hours) + ':' +
                        (minutes > 9 ? minutes : "0" + minutes) + ':' +
                        (seconds > 9 ? seconds : "0" + seconds);
  
  moveHands(hours, minutes, seconds);
}

function moveHands(hours, minutes, seconds) {
  const secondDegree = ((seconds / 60) * 360); 
  const minuteDegree = ((minutes / 60) * 360) + ((seconds / 60) * 6); 
  const hourDegree = ((hours / 12) * 360) + ((minutes / 60) * 30); 
  
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDegree}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDegree}deg)`;
  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDegree}deg)`;
}

function resetHands() {
  hourHand.style.transform = `translate(-50%, -100%) rotate(0deg)`; 
  minuteHand.style.transform = `translate(-50%, -100%) rotate(0deg)`; 
  secondHand.style.transform = `translate(-50%, -100%) rotate(0deg)`; 
}

resetHands(); 
