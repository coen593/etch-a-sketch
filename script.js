// Get Grid and Grid items
const getGrid = () => {
    return document.querySelector('.grid')
}

const getGridItems = () => {
    return document.querySelectorAll('.grid-item')
}

// Main functions
const updateGrid = (size) => {
    const items = getGridItems()
    items.forEach(item => item.remove())
    const grid = getGrid()
    for (let i = 0; i < size**2; i++) {
        const item = document.createElement('div')
        item.classList.add('grid-item')
        grid.appendChild(item)
    }
    grid.style["gridTemplateColumns"] = 'auto '.repeat(size)
}

const resetGrid = () => {
    const items = getGridItems()
    items.forEach(item => item.classList.remove('hover'))
}

// Colour functions
const getRandomValue = (max) => {
    return Math.floor(Math.random * max)
}

const greyValue = () => {
    const value = getRandomValue(220)
    return `rgb(${value}, ${value}, ${value})`
}

const colorValue = () => {
    const red = getRandomValue(220)
    const green = getRandomValue(220)
    const blue = getRandomValue(220)
    return `rgb(${red}, ${green}, ${blue})`
}

// Event listeners and inputs
const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', () => resetGrid())

const slider = document.querySelector('#rangeSize')
slider.oninput = function() {
    resetGrid()
    updateGrid(this.value)
}

updateGrid(16)
const items = getGridItems()
items.forEach(item => {
    item.addEventListener('mouseover', () => item.classList.add('hover'))
})