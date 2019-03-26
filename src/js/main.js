/**
 * * This class is used to handle which screen to display on the portfolio
 * @param name The name of the screen you want to create
 * @param link The link of the image you want to display on the screen
 */
class Screen {
    constructor(name, link) {
        this.name = name
        this.link = link
    }
}

/**
 * * This class is used to handle which screen to display on the portfolio
 * @param screens A table which contains the screens to display
 */
class Display {
    constructor(screens) {
        this.screens = screens
        this.currentScreen = screens[0]

        this.display = (screenName) => {
            for (let i = 0; i < this.screens.length; i++) {
                const screen = this.screens[i];
                if(screen.name === screenName) {
                    this.currentScreen = screens[i]
                    this.refreshScreen()
                }
            }
        }
        this.refreshScreen = () => {
            let rightImage = document.querySelector('.right .background img')
            rightImage.setAttribute('src', this.currentScreen.link)
        }
    }
}

// Creating the screens

let nespresso = new Screen('nespresso', './assets/images/nespresso.jpg')
let dassault = new Screen('dassault', './assets/images/dassault.jpg')
let powerpoint = new Screen('templating powerpoint', './assets/images/powerpoint.jpg')
let socomptoir = new Screen('so comptoir', './assets/images/socomptoir.jpg')
let tothetop = new Screen('tothetop', './assets/images/tothetop.png')
let galbobain = new Screen('galbobain', './assets/images/galbobain.jpg')

// The display is the portfolio, and we just have a set of screens to display
let portfolio = new Display([nespresso, dassault, powerpoint, socomptoir, tothetop, galbobain])

// Selects the nav and handles screen changes
let nav = document.querySelectorAll('.projects__project')

nav.forEach(link => {
    link.addEventListener('mouseenter', () => {
        portfolio.display(link.innerHTML.toLowerCase())
        document.querySelector('li.active').classList.remove('active')
        link.classList.add('active')
        document.querySelector('.background').scrollTop = 10
    })
})



