
// Mobile handling
var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
if(isMobile.any()) {
  let body = document.querySelector('body')
  body.innerHTML = ''

  let title = document.createElement('h1')
  title.innerHTML = 'Kalani'
  title.classList.add('title')
  body.appendChild(title)

  let instruction = document.createElement('p')
  instruction.innerHTML = 'Projets disponibles en version desktop'
  instruction.classList.add('instruction')
  body.appendChild(instruction)

  let a = document.createElement('a')
  a.setAttribute('href', 'https://www.instagram.com/kalakalanim/')
  a.setAttribute('target', '_blank')
  a.classList.add('qr__link')
  body.appendChild(a)

  let qrcode = document.createElement('img')
  qrcode.setAttribute('src', './assets/images/qrcode.svg')
  qrcode.classList.add('qrcode')
  a.appendChild(qrcode)

  let email = document.createElement('a')
  email.setAttribute('href', 'mailto:kalakalanicontact@gmail.com')
  email.innerHTML = 'kalakalanicontact@gmail.com'
  email.classList.add('email')
  body.appendChild(email)

  let phone = document.createElement('a')
  phone.setAttribute('href', 'tel:+33631747414')
  phone.innerHTML = '06 31 74 74 14'
  phone.classList.add('phone')
  body.appendChild(phone)

}

// ---------------------------------------------------------------------------



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
          if(screen.name === "dessins et peintures") {
            this.gallery();
          } else this.refreshScreen();
        }
      }
    };
    this.gallery = () => {
      let right = document.querySelector('.right');
      right.classList.add('gallery');
    }
    this.refreshScreen = () => {
      document.querySelector('.right').classList.remove('gallery');
      let rightImage = document.querySelector(".right .background img");
      rightImage.setAttribute("src", this.currentScreen.link);
      document.querySelector(".right").scrollTop = 0;
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
          setTimeout(() => {
            let middle = document.querySelector(".middle");
            let date = document.createElement("p");
            let project_description = document.createElement("p");
            let backArrow = document.createElement("img");

            date.innerHTML = screen.date;
            project_description.innerHTML = screen.description;

            date.classList.add("project__date");
            project_description.classList.add("project__description");
            middle.classList.add("large");
            backArrow.classList.add("back");

            backArrow.setAttribute(
              "src",
              "../assets/images/HorizontalLine.png"
            );

            document.querySelector(".active").appendChild(date);
            middle.appendChild(project_description);
            document.querySelector(".left").appendChild(backArrow);
          }, 1000);
        }
      }
    };

    this.getProjects = () => {
      // Parent nodes
      let left = document.querySelector(".left");
      let middle = document.querySelector(".middle");
      let li = document.querySelector(".highlighted");

      // Elements to delete
      let lis = document.querySelectorAll(".projects__project");
      let description = document.querySelector(".project__description");
      let back = document.querySelector(".back");

      // Remove elements
      li.removeChild(document.querySelector(".project__date"));
      middle.removeChild(description);
      left.removeChild(back);

      // Bring back the menu
      lis.forEach(li => {
        li.style.transform = "translateY(0px)";
      });

      // Remove classes
      middle.classList.remove("large");
      li.classList.remove("highlighted");
    };
  }
}

// Creating the screens

let nespresso = new Screen(
  "nespresso",
  "https://kalani-marquand.netlify.com/assets/images/nespresso.jpg",
  '<div class="squares"><div style="background-color:#003391;" class="squares__square"></div><div style="background-color:#1B1B1B;" class="squares__square"></div><div style="background-color:#D7BF5B;" class="squares__square"></div></div><p>À l\'instar du vin, notre produit possède un élégant registre de termes et expressions associés à sa dégustation.</p><p class="bold">Boisé, équilibré, corsé, doux, fruité, brulé, intense, rond…</p><p>Ces attributs aux noms évocateurs inspirent les consommateurs et sont la clef d’un moment privilégié adapté à chaque palais.</p>',
  "Décembre 2018"
);
let dassault = new Screen(
  "dassault",
  "https://kalani-marquand.netlify.com/assets/images/dassault.jpg",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat luctus eleifend. Morbi sollicitudin, elit vitae imperdiet placerat, felis tellus congue quam",
  "Novembre 2018"
);
let powerpoint = new Screen(
  "templating powerpoint",
  "https://kalani-marquand.netlify.com/assets/images/powerpoint.jpg",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat luctus eleifend. Morbi sollicitudin, elit vitae imperdiet placerat, felis tellus congue quam",
  "Janvier 2019"
);
let socomptoir = new Screen(
  "so comptoir",
  "https://kalani-marquand.netlify.com/assets/images/socomptoir.jpg",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat luctus eleifend. Morbi sollicitudin, elit vitae imperdiet placerat, felis tellus congue quam",
  "Janvier 2019"
);
let tothetop = new Screen(
  "tothetop",
  "./assets/images/tothetop.png",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat luctus eleifend. Morbi sollicitudin, elit vitae imperdiet placerat, felis tellus congue quam",
  "Décembre 2018"
);
let galbobain = new Screen(
  "galbobain",
  "https://kalani-marquand.netlify.com/assets/images/galbobain.jpg",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat luctus eleifend. Morbi sollicitudin, elit vitae imperdiet placerat, felis tellus congue quam",
  "Février 2019"
);
let gallery = new Screen(
  "dessins et peintures",
  "https://kalani-marquand.netlify.com/assets/images/galbobain.jpg",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat luctus eleifend. Morbi sollicitudin, elit vitae imperdiet placerat, felis tellus congue quam",
  ""
);

// The display is the portfolio, and we just have a set of screens to display
let portfolio = new Display([
  nespresso,
  dassault,
  powerpoint,
  socomptoir,
  tothetop,
  galbobain,
  gallery
]);

// Selects the nav and handles screen changes
let nav = document.querySelectorAll(".projects__project");

nav.forEach(link => {
  link.addEventListener("mouseenter", () => {
    portfolio.display(link.innerHTML.toLowerCase());
    document.querySelector("li.active").classList.remove("active");
    link.classList.add("active");
  });

  // On click, displays the project infos on left section
  link.addEventListener("click", () => {
    portfolio.getPage(link.innerHTML.toLowerCase());

    setTimeout(() => {
      let backArrow = document.querySelector(".back");
    backArrow.addEventListener("click", () => {
      portfolio.getProjects();
    });
    }, 1100);
  });
});


