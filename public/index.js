let startingScore = 0,
    score = 0,
    animTimer,
    addDotTimer,
    running = false;
timer = 1000,
    scoreDiv = document.getElementById('score'),
    speedDiv = document.getElementById('speed'),
    speedLabel = document.getElementById('speedLabel');
GRADIENT_TYPE = "radial-gradient";
GRADIENTS = [
    "(#f26080, #ed2f59, #f2073b)", // red
    "(#95bcf9, #4b89ed, #0960ed)", // blue
    "(#68e863, #3aa536, #047201)", // green
    "(#d387ed, #9e3dbf, #680e87)", // violet
    "(#f9e086, #f4c829, #f9c300)", // yellow
];

/**
 * Initialize app variables and start generating dots.
 */
function init() {
    setScore(startingScore);
    setSpeed();
    addDotTimer = setInterval(addDot, timer);
    animTimer = setInterval(animateDots, timer);
    speedDiv.addEventListener('change', setSpeed);
}

function getRandomGradient() {
    return (
        this.GRADIENT_TYPE +
        this.GRADIENTS[Math.floor(Math.random() * this.GRADIENTS.length)]
    );
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
    span.style["background-image"] = getRandomGradient();
    span.addEventListener('click', dotClicked);
    dotContainer.appendChild(span);
}

/**
 * Handler to track clicks on dots. Removed clicked dots and update score.
 */
function dotClicked() {
    if (!running) {
        return false;
    }
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
        let positionY = parseInt(dots[i].style.top, 10);
        let velocity = positionY += speed;

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
    const gameBtn = document.getElementById('gameBtn');
    gameBtn.addEventListener('click', () => {
        if (gameBtn.innerText === 'START') {
            running = true;
            gameBtn.innerText = 'PAUSE';
            init();
        } else {
            running = false;
            clearInterval(addDotTimer);
            clearInterval(animTimer);
            gameBtn.innerText = 'START';
        }
    })
};
