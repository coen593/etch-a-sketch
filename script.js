document.getElementById( "color-input" ).addEventListener( "focus", function (e) {
    /* { "id" : null, "container" : "the container for widget(required)", "value" : "rgba(1,1,1,1)(required)" } */
    var data = {
        "id" : null,
        "container" : document.getElementById( "colorizer" ),
        "value" : document.getElementById( "color-input" ).value
    }
    var colorizer = new Gn8Colorize( data );
    colorizer.init().then( 
      success => {
        /* { "hex" : "#ff0000", "rgb" : "rgba(255,0,0,1)", "name" : "red", "theme" : "dark | light" } */
        document.getElementById( "color-input" ).value = success.rgb;
        console.log( success );
      }, error => {
        console.log( error );
      } 
    );
  });

// Get Grid and Grid items
const getGrid = () => {
    return document.querySelector('.grid')
}

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

// Main functions
const resetGrid = () => {
    const items = getGridItems()
    items.forEach(item => item.classList.remove('hover'))
}

const fillGridCell = (item) => {
    let color = ''
    if (fillType === 'co') {
        color = colorValue()
    } else if (fillType === 'gs') {
        color = greyValue()
    } else if (fillType === 'er') {
        color = 'transparent'
    } else {
        color = 'rgb(0, 0, 0)'
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
    const grid = getGrid()
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
    addCellHover()
    addCellTouch()
}

// Event listeners and inputs
const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', () => resetGrid())

const slider = document.querySelector('#rangeSize')
slider.oninput = function() {
    resetGrid()
    updateGrid(this.value)
}

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

updateGrid(16)