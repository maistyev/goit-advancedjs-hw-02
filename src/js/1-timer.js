import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  days: document.querySelector('.js-timer-days'),
  hours: document.querySelector('.js-timer-hours'),
  minutes: document.querySelector('.js-timer-minutes'),
  seconds: document.querySelector('.js-timer-seconds'),
  startButton: document.querySelector('.js-timer-start'),
  resetButton: document.querySelector('.js-timer-reset'),
};

if (localStorage.getItem('end-timer')) {
  refs.startButton.disabled = true;
  startTimer();
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates);
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    refs.startButton.disabled = false;

    if (selectedDate < currentDate) {
      refs.startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      localStorage.removeItem('end-timer');
    } else {
      localStorage.setItem('end-timer', JSON.stringify(selectedDate));
      refs.startButton.disabled = false;
    }
  },
};
const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  const savedDate = localStorage.getItem('end-timer');
  if (!savedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  const endDate = new Date(JSON.parse(savedDate));
  const currentDate = new Date();
  const deltaTime = endDate - currentDate;

  if (deltaTime <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  window.timerId = setInterval(() => {
    refs.startButton.disabled = true;
    const currentTime = new Date();
    const deltaTime = endDate - currentTime;
    if (deltaTime <= 0) {
      clearInterval(timerId);
      iziToast.success({
        title: 'Success',
        message: 'Time is up!',
      });
      localStorage.removeItem('end-timer');
      refs.startButton.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = days < 10 ? `0${days}` : days;
    refs.hours.textContent = hours < 10 ? `0${hours}` : hours;
    refs.minutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
    refs.seconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }, 1000);
}

refs.startButton.addEventListener('click', startTimer);
refs.resetButton.addEventListener('click', () => {
  localStorage.removeItem('end-timer');
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
  refs.startButton.disabled = false;
  clearInterval(window.timerId);
  window.timerId = null;
});
