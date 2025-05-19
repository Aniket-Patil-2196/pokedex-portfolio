const portfolioData = {
  welcome: {
    left: {
      title: "Welcome!",
      message: "Press A to start.\nUse arrow keys to navigate.\nA = Select | B = Back"
    },
    right: {
      content: ""
    }
  },
  menu: ["About Me", "Skills", "Projects", "Contact"],

  about: {
    title: "About Me",
    description: "I’m a first-year Computer Science student passionate about web development, AI, and cybersecurity. Currently learning frontend and backend development, and preparing for future placements.",
  },

  skills: {
    title: "Skills",
    items: ["HTML", "CSS", "JavaScript", "Git", "Responsive Design", "Basic Python"]
  },

  projects: {
    title: "Projects",
    items: [
      {
        name: "Pokédex Portfolio",
        description: "A creative portfolio styled like a Pokédex, built with HTML, CSS, and JavaScript."
      },
      {
        name: "To-Do App",
        description: "A basic to-do list web app with local storage and dark mode."
      }
    ]
  },

  contact: {
    title: "Contact",
    email: "youremail@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile"
  }
};

// Element references
let openBtn = document.querySelector(".open-btn");
let leftPart = document.querySelector(".right");
let closeBtn = document.querySelector(".close");
let lightBlink = document.querySelector(".start-light");
let display = document.querySelector(".display");
const leftText = document.getElementById("left-text");

// Typing control variables
let isTyping = false;
let typingTimeouts = [];
const welcomeMessage = `Welcome Trainer! \n
Press A to start \n
Use arrow keys to navigate \n
A = Select | B = Back`;

// typetext function 

function typeText(element, text, speed = 30, callback = null) {
  isTyping = true;
  let i = 0;
  element.innerHTML = "";

  function typingStep() {
    if (!isTyping) return; // If stopped, exit
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      const timeout = setTimeout(typingStep, speed);
      typingTimeouts.push(timeout);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

  typingStep();
}

// stop typing function
function stopTyping() {
  isTyping = false;
  typingTimeouts.forEach(timeout => clearTimeout(timeout));
  typingTimeouts = [];
}

// on pokedex
function onPokedex() {
  leftPart.classList.add("right-open");
  setTimeout(() => lightBlink.classList.add("start-blink"), 1000);
  display.classList.remove("display-none");

  stopTyping(); // In case it's still typing from before
  setTimeout(() => {
    typeText(leftText, welcomeMessage, 50);
  }, 1000);
}

// close pokedex

function closePokedex() {
  leftPart.classList.remove("right-open");
  lightBlink.classList.remove("start-blink");

  stopTyping();
  leftText.innerHTML = ""; // Clear the text
}

if (openBtn) {
  openBtn.addEventListener("click", onPokedex);
}

if (closeBtn) {
  closeBtn.addEventListener("click", closePokedex);
}

// buttuns fun

// let quirselect 

// select and Deselect
let aBtn = document.querySelector(".a-btn");
let bBtn = document.querySelector(".b-btn");

// navagations
let rightBtn = document.querySelector(".rig-btn");
let leftBtn = document.querySelector(".lef-btn");
let upBtn = document.querySelector(".up-btn");
let downBtn = document.querySelector(".down-btn");

// stored values
let currentScreen = "welcome";
let menuItems = ["About Me", "Skills", "Projects", "Contact"];
let menuSelected = null;


// Functions 

// show menu

function showMenu() {
  display.innerHTML = "";
  if (currentScreen === "welcome") {
    display.innerHTML += `<p>Menu</p><ul class="menu-list"></ul>`;
    const ul = display.querySelector(".menu-list");
    let i = 0;

    function showNextItem() {
      if (i < menuItems.length) {
        const li = document.createElement("li");
        li.textContent = menuItems[i];
        li.classList.add("border");
        ul.appendChild(li);
        i++;
        setTimeout(showNextItem, 500);
      }
    }
    showNextItem();
  }
}

// back

function back() {
  if (currentScreen === "menu" || currentScreen === "welcome") {
    // If already at the main menu or welcome, just reset to welcome
    currentScreen = "welcome";
    display.innerHTML = "";
    typeText(leftText, welcomeMessage, 50);
  } else {
    // Go back to menu from any sub-screen
    currentScreen = "menu";
    display.innerHTML = "";
    typeText(leftText, "Menu", 50);
    showMenu();
  }
}
// lets add functionality to a - btn

aBtn.addEventListener("click", () => {
  console.log("a is clicked");
  showMenu();
  return currentScreen = "menu";
  
});

bBtn.addEventListener("click" , () => {
  back();
})

