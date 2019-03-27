/**
 * * This class is used to handle which screen to display on the portfolio
 * @param name The name of the screen you want to create
 * @param link The link of the image you want to display on the screen
 * @param description The html for the description part
 */
class Screen {
  constructor(name, link, description, date) {
    this.description = description;
    this.name = name;
    this.link = link;
    this.date = date;
  }
}

/**
 * * This class is used to handle which screen to display on the portfolio
 * @param screens A table which contains the screens to display
 */
class Display {
  constructor(screens) {
    this.screens = screens;
    this.currentScreen = screens[0];

    this.display = screenName => {
      for (let i = 0; i < this.screens.length; i++) {
        const screen = this.screens[i];
        if (screen.name === screenName) {
          this.currentScreen = screens[i];
          this.refreshScreen();
        }
      }
    };
    this.refreshScreen = () => {
      let rightImage = document.querySelector(".right .background img");
      rightImage.setAttribute("src", this.currentScreen.link);
    };

    this.getPage = screenName => {
      let lis = document.querySelectorAll(".projects__project");
      let middleToTop = document.querySelector(".middle").offsetTop;

      for (let i = 0; i < this.screens.length; i++) {
        const screen = this.screens[i];
        if (screen.name === screenName) {
          lis.forEach(li => {
            if (li.classList.contains("active")) {
              li.classList.add("highlighted");
              let liToTop = li.offsetTop;
              let toScroll = liToTop - middleToTop - 100;
              li.style.transform = "translateY(-" + toScroll + "px)";
            } else {
              li.style.transform = "translateX(-1000px)";
            }
          });
          let date = document.createElement("p");
          date.innerHTML = screen.date;
          date.classList.add('project__date')
          document.querySelector(".active").appendChild(date);
        }
      }
    };
  }
}

// Creating the screens

let nespresso = new Screen(
  "nespresso",
  "./assets/images/nespresso.jpg",
  "lorem",
  "Décembre 2018"
);
let dassault = new Screen(
  "dassault",
  "./assets/images/dassault.jpg",
  "lorem",
  "Novembre 2018"
);
let powerpoint = new Screen(
  "templating powerpoint",
  "./assets/images/powerpoint.jpg",
  "lorem",
  "Janvier 2019"
);
let socomptoir = new Screen(
  "so comptoir",
  "./assets/images/socomptoir.jpg",
  "lorem",
  "Janvier 2019"
);
let tothetop = new Screen(
  "tothetop",
  "./assets/images/tothetop.png",
  "lorem",
  "Décembre 2018"
);
let galbobain = new Screen(
  "galbobain",
  "./assets/images/galbobain.jpg",
  "lorem",
  "Février 2019"
);

// The display is the portfolio, and we just have a set of screens to display
let portfolio = new Display([
  nespresso,
  dassault,
  powerpoint,
  socomptoir,
  tothetop,
  galbobain
]);

// Selects the nav and handles screen changes
let nav = document.querySelectorAll(".projects__project");

nav.forEach(link => {
  link.addEventListener("mouseenter", () => {
    portfolio.display(link.innerHTML.toLowerCase());
    document.querySelector("li.active").classList.remove("active");
    link.classList.add("active");
    document.querySelector(".background").scrollTop = 10;
  });
  link.addEventListener("click", () => {
    portfolio.getPage(link.innerHTML.toLowerCase());
  });
});
