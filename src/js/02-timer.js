import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


// Подсчет даты
// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.


  // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const datePicker = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');
const daysField=document.querySelector('[data-days]');
const hoursField=document.querySelector('[data-hours]');
const minutesField=document.querySelector('[data-minutes]');
const secondsField=document.querySelector('[data-seconds]');
let intervalId = null;
let targetData = null;
let leftTime = 0;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
      return;
      };
    targetData = selectedDates[0];
    startBtn.disabled = false;
    startBtn.addEventListener('click', ()=>{
      timer.start();
      });

 
  },

  };

flatpickr(datePicker, options);




// timer
const timer ={
    start(){
      intervalId=setInterval(() => {
            const deltaTime =targetData.getTime() - Date.now();;
            const time =convertMs(deltaTime);
            if (leftTime >= 0) {
              updateClock(time);
            }
              // clearInterval(intervalId);
        }, 1000);
        startBtn.disabled = true;
    },
};




// paste in markup

function updateClock ({ days, hours, minutes, seconds }){

    daysField.textContent= `${days}`;
    hoursField.textContent= `${hours}`;
    minutesField.textContent= `${minutes}`;
    secondsField.textContent= `${seconds}`;

};
// convert
function addLeadingZero(value){
  return String(value).padStart(2,'0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};
