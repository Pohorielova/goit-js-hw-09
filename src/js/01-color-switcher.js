// В HTML есть кнопки «Start» и «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, который после нажатия кнопки «Start»,
// раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль.
// При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз.
// Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};



// 1. Взять кнопки
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const DELAY = 1000;
let intervalId = null;


// 2. Повесить сетинтервал и дисаблед старт пока интервалит и рандомный цвет на бсдж
startBtn.addEventListener('click', changeColor);

function changeColor() {
  intervalId = setInterval(() => {
  body.style.backgroundColor =getRandomHexColor();
  startBtn.setAttribute('disabled', true);
  // console.log('hi');
  }, DELAY)
 };

// 3. Снять интервал
stopBtn.addEventListener('click',stopChangeColor);

function stopChangeColor(){
  startBtn.removeAttribute('disabled');
  clearInterval(intervalId);
};
