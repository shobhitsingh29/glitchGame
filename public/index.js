let startingScore = 0,
  score = 0,
  timer = 1000,
  dotColors = ['red', 'green', 'purple', 'cyan', 'blue'],
  scoreDiv = document.getElementById('score'),
  speedDiv = document.getElementById('speed'),
  speedLabel = document.getElementById('speedLabel');

/**
 * Initialize app variables and start generating dots.
 */  
function init() {
  setScore(startingScore);
  setSpeed();
  setInterval(game, timer);
  speedDiv.addEventListener('change', setSpeed);
}

/**
 * Utility to get current speed
 */
function getSpeed() {
  return parseInt(speedDiv.value, 10);
}

/**
 * Utility to set/update speed
 */
function setSpeed() {
  speedLabel.innerHTML = getSpeed();
}

/**
 * Add and animate dots
 */
function game() {
  addDot();
  animateDots();
}

/**
 * Generate dots
 */
function addDot() {
  let dotContainer = document.getElementById('dotContainer'),
    maxWidth = window.innerWidth - 100,
    dotSize = generateDotSize(10, 100),
    dotValue = generateDotValue(dotSize),
    dotLeftPosition = generateDotPosition(0, maxWidth),
    span = document.createElement('span'),
    topPosition = 0 - dotSize - getSpeed();

  span.setAttribute('class', 'dot');
  span.setAttribute('data-size', dotSize);
  span.setAttribute('data-value', dotValue);
  span.style.width = dotSize + 'px';
  span.style.height = dotSize + 'px';
  span.style.top = topPosition + 'px';
  span.style.left = dotLeftPosition + 'px';
  span.style.backgroundColor = dotColors[Math.floor(Math.random() * dotColors.length)];
  span.addEventListener('click', dotClicked);
  dotContainer.appendChild(span);
}

/**
 * Handler to track clicks on dots. Removed clicked dots and update score.
 */
function dotClicked() {
  const elment = this,
    dotValue = parseInt(elment.getAttribute('data-value'), 10);

  setTimeout(function () {
    setScore(dotValue);
    removeElement(elment);
  }, 10);
}

/**
 * Utility to update score
 * @param {number} value 
 */
function setScore(value) {
  score += value;
  scoreDiv.innerHTML = score;
}

/**
 * Animate dots to move down the screen. Remove the dots that moves past the screen size.
 */
function animateDots() {
  let dots = document.querySelectorAll('.dot');
  const dotContainerHeight = document.getElementById('dotContainer').offsetHeight,
    speed = getSpeed();

  for (let i = 0; i < dots.length; i++) {
    let positionY = parseInt(dots[i].style.top, 10),
      velocity = positionY += speed;

    if (positionY > dotContainerHeight) {
      removeElement(dots[i]);
    }
    dots[i].style.top = velocity + "px";
  }
}

/**
 * Start app on page load.
 */
window.onload = function () {
  init();
};
