const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeListButton = document.querySelector('#time-list')
const timeLeft = document.querySelector('#time-left')
const board = document.querySelector('#board')

let time = 0
let score = 0
const RANDOM_COLORS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

startButton.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeListButton.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function finishGame() {
    timeLeft.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const circleSize = getRandomCircleNumber(10, 60)
    const circleColor = getRandomColor()
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomCircleNumber(0, width - circleSize)
    const y = getRandomCircleNumber(0, height - circleSize)

    circle.classList.add('circle')
    circle.style.width = `${circleSize}px`
    circle.style.height = `${circleSize}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = circleColor
    circle.style.boxShadow = `0 0 2px ${circleColor}, 0 0 10px ${circleColor}`;

    board.append(circle)
}

function getRandomCircleNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    let color = '#';
    const randomIndex = () => Math.floor(Math.random() * RANDOM_COLORS.length);

    for (let i = 0; i < 6; i++) {
        color += RANDOM_COLORS[randomIndex()];
    }
    return color;
}

function setTime(value) {
    timeLeft.innerHTML = `00:${value}`
}

function winTheGame(n) {
    function killCircle() {
        const circle = document.querySelector('.circle')
        
        if (circle) {
            circle.click()
        }
    }

    setInterval(kill, n)
}
