// Control appheight to keep 100vh in browser correctly
const getAppHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
getAppHeight()
window.addEventListener('resize', () => getAppHeight());

// Set default size
const DEFAULT_SIZE = 16

// Get Grid and Grid items
const grid = document.querySelector('.grid')

const getGridItems = () => {
    return document.querySelectorAll('.grid-item')
}

// Mousedown checks
let isMouseDown = false
document.addEventListener('mousedown', () => isMouseDown = true)
document.addEventListener('mouseup', () => isMouseDown = false)
document.addEventListener('touchstart', () => isMouseDown = true)
document.addEventListener('touchend', () => isMouseDown = false)

// Colour functions
const getRandomValue = (max) => {
    return Math.floor(Math.random() * max)
}

const greyValue = (item) => {
    const currentGrey = item.style.backgroundColor
    const currentValue = currentGrey.split(',')[0].split('(')[1]
    const newGrey = currentValue - 7
    return `rgb(${newGrey}, ${newGrey}, ${newGrey})`
}

const colorValue = () => {
    const getRandomValue = (max) => {
        return Math.floor(Math.random() * max)
    }
    const red = getRandomValue(256)
    const green = getRandomValue(256)
    const blue = getRandomValue(256)
    return `rgb(${red}, ${green}, ${blue})`
}

// Main functions
const resetGrid = () => {
    const items = getGridItems()
    items.forEach(item => item.style.backgroundColor = 'rgb(255, 255, 255)')
}

const fillGridCell = (item) => {
    let color = ''
    if (fillType === 'co') {
        color = colorValue()
    } else if (fillType === 'gs') {
        color = greyValue(item)
    } else if (fillType === 'er') {
        color = 'rgb(255, 255, 255)'
    } else {
        color = document.querySelector('#color').value
    }
    item.style.backgroundColor = color
}

const addCellHover = () => {
    const items = getGridItems()
    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            if (isMouseDown) {
                fillGridCell(item)
            }
        })
    })
}

const addCellTouch = () => {
    let clientX, clientY
    grid.addEventListener('touchstart', function(e) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
    }, false)
    grid.addEventListener('touchmove', function(e) {
        let target
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
        target = document.elementFromPoint(clientX, clientY)
        if (target.classList.contains('grid-item')) fillGridCell(target)
    })
}

const updateSizeNumber = (size) => {
    const sizeNumber = document.querySelector('#sizeNumber')
    sizeNumber.innerHTML = `${size} x ${size}`
}

const removeGridItems = () => {
    const items = getGridItems()
    items.forEach(item => item.remove())
}

const createNewGrid = (size) => {
    for (let i = 0; i < size**2; i++) {
        const item = document.createElement('div')
        item.classList.add('grid-item')
        item.style.backgroundColor = 'rgb(255, 255, 255)'
        grid.appendChild(item)
    }
}

const updateGrid = (size) => {
    removeGridItems()
    createNewGrid(size)
    grid.style["gridTemplateColumns"] = `repeat(${size}, 1fr)`
    addCellHover()
    addCellTouch()
    updateSizeNumber(size)
}

// Event listeners and inputs
const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', () => resetGrid())

const slider = document.querySelector('#rangeSize')
slider.oninput = function() {
    resetGrid()
    updateGrid(this.value)
}

const removeGrid = document.querySelector('#removeGrid')
removeGrid.addEventListener('click', () => {
    const items = getGridItems()
    items.forEach(item => item.classList.toggle('noBorder'))
    if (removeGrid.innerHTML === 'Remove grid') {
        removeGrid.innerHTML = 'Add grid'
    } else {
        removeGrid.innerHTML = 'Remove grid'
    }
})

const colorOptions = document.querySelectorAll('.colorOptions>.btn')
let fillType = 'mc'
colorOptions.forEach(button => {
    button.addEventListener('click', function() {
        fillType = this.id
        colorOptions.forEach(button => {
            button.classList.remove('active')
            if (button.id === fillType) {
                button.classList.add('active')
            }
        })
    })
})

updateGrid(DEFAULT_SIZE)