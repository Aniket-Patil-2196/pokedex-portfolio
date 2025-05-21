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

// traks typing

let currentTyping = null;

// new typeText

function typeHTMLContent(html, element, speed = 30, callback = null) {
  // Cancel ongoing typing if any
  if (currentTyping && currentTyping.timer) {
    clearTimeout(currentTyping.timer);
    currentTyping = null;
  }

  let i = 0;
  let isTag = false;
  let tagBuffer = "";
  let display = "";

  // Clear previous content
  element.innerHTML = "";

  function typeChar() {
    const char = html[i];

    if (char === "<") {
      isTag = true;
      tagBuffer = char;
    } else if (char === ">" && isTag) {
      tagBuffer += char;
      display += tagBuffer;
      element.innerHTML = display + '<span class="cursor">|</span>';
      isTag = false;
      tagBuffer = "";
    } else if (isTag) {
      tagBuffer += char;
    } else {
      display += char;
      element.innerHTML = display + '<span class="cursor">|</span>';
    }

    i++;

    if (i < html.length) {
      currentTyping = {
        timer: setTimeout(typeChar, isTag ? 0 : speed)
      };
    } else {
      element.innerHTML = display; // Final output, no cursor
      if (callback) callback();
      currentTyping = null;
    }
  }

  typeChar();
}

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

  if (currentTyping && currentTyping.timer) {
    clearTimeout(currentTyping.timer);
    currentTyping = null;
  }
}

// on pokedex
function onPokedex() {
  leftPart.classList.add("right-open");
  setTimeout(() => lightBlink.classList.add("start-blink"), 1000);
  display.classList.remove("display-none");

  stopTyping(); // In case it's still typing from before
  display.classList.add("textproperty");
  setTimeout(() => {
    typeText(display, welcomeMessage, 50);
  }, 1000);
  currentScreen = "welcome";
}

// close pokedex

function closePokedex() {
  leftPart.classList.remove("right-open");
  lightBlink.classList.remove("start-blink");

  stopTyping();
  leftText.innerHTML = ""; // Clear the text
  rightScreen.innerHTML = "";
  display.innerHTML = "";
  currentScreen = "welcome";
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

// screen 

let rightScreen = document.querySelector(".display-right");

// stored values
let currentScreen = null;
let menuItems = ["About Me", "Skills", "Projects", "Contact"];
let menuSelected = null;

let selectItemIdx = 0;
// Functions 

// show menu

function showMenu() {
  display.innerHTML = "";
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


// back

function back() {
  stopTyping(); // Always stop typing first

  if (currentScreen === "menu") {
    stopTyping();
    console.log("b clicked");
    currentScreen = "menu";
    leftText.innerHTML = ""; // Clear the left screen
    display.innerHTML = "";

    // Ensure it's visible
    document.querySelector(".display").classList.remove("display-none");
    display.classList.add("textproperty");

    // Type welcome message again
    setTimeout(() => {
      typeText(display, welcomeMessage, 50);
    }, 300);
    currentScreen = "welcome";
  } else if (currentScreen === "welcome") {
    stopTyping();
    console.log("b clicked");
    leftText.innerHTML = ""; // Clear the left screen
    display.innerHTML = "";

    // Ensure it's visible
    document.querySelector(".display").classList.remove("display-none");
    display.classList.add("textproperty");

    // Type welcome message again
    setTimeout(() => {
      typeText(display, welcomeMessage, 50);
    }, 300);
  }
  if (currentScreen === "info") {
    stopTyping();
    rightScreen.innerHTML = "";
    display.innerHTML = "";
    display.classList.remove("textproperty");
    showMenu();
    currentScreen = "menu";
  }
}

// lets add functionality to a - btn

aBtn.addEventListener("click", () => {
  console.log("A button clicked");
  if (currentScreen === "welcome") {
    stopTyping();
    display.classList.remove("textproperty");
    currentScreen = "welcome";
    console.log("Current screen before:", currentScreen);
    showMenu();
    currentScreen = "menu";
  } else if (currentScreen === "menu") {
    // showInfo();
    currentScreen = "menu"
    logSelectedMenuItem();
    console.log("info Print");
  }
  let listItems = document.querySelector(".display ul");
  console.log(listItems);
  console.log("Current screen after:", currentScreen);
  return listItems;
});



bBtn.addEventListener("click", () => {
  back();
});

// item Select 

function deselectItem(item) {
  if (!item) return;
  const listItem = item.querySelectorAll("li");
  listItem.forEach(li => {
    li.innerText = li.innerText.replace(/^>\s*/, "");
  });
}

function seleItem(item) {
  const listItem = item.querySelectorAll("li");
  if (listItem[selectItemIdx]) {
    listItem[selectItemIdx].innerText = `> ${listItem[selectItemIdx].innerText.replace(/^>\s*/, "")}`;
  }
}

// Initialize selection on menu show
function initializeMenuSelection() {
  let listItems = document.querySelector(".display ul");
  if (!listItems) return;
  deselectItem(listItems);
  selectItemIdx = 0;
  seleItem(listItems);
}

upBtn.addEventListener("click", () => {
  let listItems = document.querySelector(".display ul");
  if (!listItems) return;
  deselectItem(listItems);
  selectItemIdx = Math.max(selectItemIdx - 1, 0);
  seleItem(listItems);
  console.log(selectItemIdx);
});

downBtn.addEventListener("click", () => {
  let listItems = document.querySelector(".display ul");
  if (!listItems) return;
  deselectItem(listItems);
  selectItemIdx = Math.min(selectItemIdx + 1, menuItems.length - 1);
  seleItem(listItems);
  console.log(selectItemIdx);
});

// Optionally, call initializeMenuSelection() after showMenu()
const originalShowMenu = showMenu;
showMenu = function () {
  originalShowMenu();
  setTimeout(initializeMenuSelection, menuItems.length * 500 + 10);
};

// lets show info on right screen
// The following code should only run after the menu is rendered and listItems exists.
// Example: place this inside a function that runs after showMenu() and initializeMenuSelection().



function logSelectedMenuItem() {
  let listItems = document.querySelector(".display ul");
  if (!listItems) {
    console.log("Menu not rendered yet.");
    return;
  }
  const listItem = listItems.querySelectorAll("li");
  if (listItem[selectItemIdx]) {
    console.log(listItem[selectItemIdx].innerText.replace(/^>\s*/, ""));
  }
  // Get the selected menu item's text (without "> ")
  const selectedText = listItem[selectItemIdx].innerText.replace(/^>\s*/, "");

  // Loop through the information object to find a matching title
  for (const key in information) {
    if (
      information[key].title &&
      information[key].title.toLowerCase() === selectedText.toLowerCase()
    ) {
      console.log(information[key].description);
      typeHTMLContent(information[key].description, rightScreen, speed = 30);
      showSkillsIcons(information[key]);
      showAboutMeLeftScreen();
      break;
    }
  }
  console.log(listItems);
}

// show cont in left cont 
function showSkillsIcons(type) {
  display.innerHTML = type.leftCont;
  display.classList.add("textproperty");
  currentScreen = "info"; // or whatever screen you want to assign
}

// info

const information = {
  about: {
    title: "About Me",
    leftCont: `<p><b>About Me :</b></p>
                    <div id="about-left" class="about-section" style="text-align:center;">
                        <img id="trainer-avatar" src="assets/img/Trainer.png" alt="Trainer Avatar" width="100" />
                        <p id="trainer-dialogue" class="dialogue-text">Loading wisdom...</p>
                    </div>`,
    description: `<p><b>Trainer:</b>Aniket J.Patil</p>
<p><br>
<b>ID:</b> #2025 <br><br>
<b>Region:</b> CSE, TKIET <br><br>
<b>Specialty:</b> <br>
Frontend Development, Exploring the Wilds of Backend <br><br>
<b>Bio:</b> <br>
An enthusiastic web developer in training, always ready to catch new technologies!
Currently leveling up in JavaScript, HTML, and CSS. Looking to evolve into a Full Stack
Developer by 2026.</p>`
  },

  skills: {
    title: "Skills",
    description: `<h4>HTML</h4><br>
<p>
    <b>Type:</b> Markup <br><br>
    <b>Level:</b> 90 (Master) <br><br>
    <b>Description:</b><br> Strong expertise in semantic HTML5, structuring web content with precision and accessibility. <br><br>
    <b>Key Moves:</b><br> Semantic Tags, Forms, Accessibility <br><br>
    <p>======================</p>
</p><br>

<h4>CSS</h4><br>
<p>
    <b>Type:</b> Styling <br><br>
    <b>Level:</b> 90 (Master) <br><br>
    <b>Description:</b><br> Skilled at crafting responsive, visually appealing layouts using Flexbox, Grid, and animations. <br><br>
    <b>Key Moves:</b><br> Responsive Design, Animations, Transitions <br><br>
    <p>======================</p>
</p><br>

<h4>JavaScript</h4><br>
<p>
    <b>Type:</b> Programming Language <br><br>
    <b>Level:</b> 75 (Advanced) <br><br>
    <b>Description:</b><br> Proficient in JavaScript fundamentals and modern ES6+ features, powering interactive user experiences. <br><br>
    <b>Key Moves:</b><br> DOM Manipulation, Async/Await, ES6+ <br><br>
    <p>======================</p>
</p><br>

<h4>Git & GitHub</h4><br>
<p>
    <b>Type:</b> Version Control <br><br>
    <b>Level:</b> 40 (Beginner) <br><br>
    <b>Description:</b><br> Basic knowledge of version control, branch management, and collaboration through GitHub. <br><br>
    <b>Key Moves:</b><br> Commit, Branch, Merge <br><br>
    <p>======================</p>
</p><br>

<h4>React.js</h4><br>
<p>
    <b>Type:</b> Frontend Framework <br><br>
    <b>Level:</b> 🔒 Locked (Coming Soon) <br><br>
    <b>Description:</b><br> Ready to unlock React skills for dynamic UI development and state management. <br><br>
    <p>======================</p>
</p><br>

<h4>Node.js</h4><br>
<p>
    <b>Type:</b> Backend Runtime <br><br>
    <b>Level:</b> 🔒 Locked (Coming Soon) <br><br>
    <b>Description:</b><br> Backend adventures await with Node.js for scalable server-side applications. <br><br>
    <p>======================</p>
</p><br>

<h4>Passive Abilities</h4><br>
<p>
    🌀 <b>Fast Learner:</b> Quickly adapts and masters new technologies. <br><br>
    📘 <b>Documentation Reader:</b> Efficient at digging into docs for self-learning and troubleshooting. <br><br>
    ⚡ <b>Bug Fixer Instinct:</b> Natural knack for identifying and resolving bugs swiftly. <br><br>
    <p>======================</p>
</p><br>`,

    leftCont: `
  <p><b>Skills :</b></p>
  <div class="logos-cont">
    <div class="logos"><img src="assets/icons svg/HTML.svg" alt="html"> HTML</div>
    <div class="logos"><img src="assets/icons svg/CSS.svg" alt="CSS"> CSS</div>
    <div class="logos"><img src="assets/icons svg/JS.svg" alt="JS"> JS</div>
    <div class="logos"><img src="assets/icons svg/gitHub.svg" alt="gitHub"> Git</div>
    <div class="logos"><img src="assets/icons svg/react.svg" alt="react"> 🔒React🔒</div>
    <div class="logos"><img src="assets/icons svg/node.svg" alt="node"> 🔒Node🔒</div>
  </div>`

  },

  Projects: {
    title: "Projects",
    description: `<h3>🌍 Project Journey — Trainer’s Adventure Log</h3><br>

<h4>📍 Pallet Town – Tic-Tac-Toe</h4><br>
<p>
    The journey begins! In the quiet town of Pallet, you built your first project — a tactical battle of Xs and Os. Simple, sharp, and full of logic power.
    <br><br>
    <b>Tech Used:</b> HTML, CSS, JavaScript<br>
    <b>Learned:</b> Game logic, turn-based state management, UI handling
</p><br>
<p>======================</p><br>

<h4>📍 Viridian City – Rock Paper Scissors</h4><br>
<p>
    First challenge outside your hometown! A game of luck and logic — battling the CPU with a stylish UI and randomized strategy.
    <br><br>
    <b>Tech Used:</b> HTML, CSS, JavaScript<br>
    <b>Learned:</b> Randomization, dynamic DOM updates, score tracking
</p><br>
<p>======================</p><br>

<h4>📍 Cerulean City – Currency Converter</h4><br>
<p>
    Time to explore the world! In Cerulean, you tamed an external API to convert real-time currencies — perfect for trainers exploring multiple regions.
    <br><br>
    <b>Tech Used:</b> HTML, CSS, JavaScript, REST API<br>
    <b>Learned:</b> Fetch API, async/await, data parsing, form validation
</p><br>
<p>======================</p><br>

<h4>📍 Celadon City – Spotify Clone</h4><br>
<p>
    The big city of music and design. You created your own sound-based app, giving users a smooth and dynamic listening experience.
    <br><br>
    <b>Tech Used:</b> HTML, CSS, JavaScript<br>
    <b>Learned:</b> Audio APIs, responsive UI, media controls, layout scaling
</p><br>
<p>======================</p><br>

<h4>📍 Indigo Plateau – Pokédex Portfolio</h4><br>
<p>
    The ultimate destination — your very own Pokédex-style portfolio! A legendary interface that showcases your journey, skills, and strengths as a digital trainer.
    <br><br>
    <b>Tech Used:</b> HTML, CSS, JavaScript, SVG<br>
    <b>Learned:</b> Theming, icon integration, creative layout design
</p><br>
<p>======================</p><br>
`,
    leftCont: `<p><b>Projects :</b></p>
                    <div class="proj-cont">
                        <div class="proj"><img src="assets/img/pokeball.png" alt="pokeball"> TIC-TAC-TOE</div>
                        <div class="proj"><img src="assets/img/pokeball.png" alt="pokeball"> Rock-Paper-Scissor</div>
                        <div class="proj"><img src="assets/img/pokeball.png" alt="pokeball"> Currency Converter</div>
                        <div class="proj"><img src="assets/img/pokeball.png" alt="pokeball"> Music Player</div>
                        <div class="proj"><img src="assets/img/pokeball.png" alt="pokeball"> Pokédex-Portfolio</div>
                    </div>`
  },
  Contacts: {
    title: "Contact",
    description: `<h3>📡 Pokégear — Trainer Communication Center</h3><br>

<p>🔔 <b>Trainer ID:</b> Aniket.P#2196</p>
<p>📍 <b>Region:</b> TKIET — CSE Department</p><br>

<p>📬 <b>Send a Message:</b></p>
<ul>
  <li>📧 Email:<br> <a href="mailto:aniketjaysingpatil2006@gmail.com">aniketjaysingpatil<br>2006@gmail.com</a></li>
  <li>💼 LinkedIn:<br> <a href="https://www.linkedin.com/in/aniket-patil-489545341/" target="_blank">Aniket Patil</a></li>
  <li>💻 GitHub:<br> <a href="https://github.com/Aniket-Patil-2196" target="_blank">Aniket-Patil-2196</a></li>
  <li>📷 Instagram:<br> <a href="https://www.instagram.com/_aniketp.21__/" target="_blank">@_aniketp.21__</a></li>
</ul><br>

<p>📝 <i>"This trainer is open to collaboration, remote missions, and new adventures in frontend, backend, or open source realms."</i></p><br>
`,
    leftCont : `<div class="contact-info">
                        <p><strong>Contact Me:</strong></p>
                        <p>
                            <span class="emoji">📡</span> Connecting... <br>
                            <span class="emoji">🧑‍💻</span> Trainer is ready to trade knowledge!
                        </p>
                        <ul>
                            <li>"You can reach me via Email or LinkedIn!"</li>
                            <li>Signal strength: Excellent</li>
                            <li>"Awaiting your message, fellow coder!"</li>
                        </ul>
                    </div>
`
  }

}

// about ME 

const dialogueLines = [
  "A new challenger approaches!",
  "Currently training in Tailwind Gym...",
  "Caught a wild React Component!",
  "VS Code is super effective!",
  "Bug was fixed! It fainted.",
  "You gained 200 XP from debugging.",
  "Ash Byte used Git Push. It’s super effective!",
];

let dialogueIndex = 0;

function rotateDialogue() {
  const dialogue = document.getElementById("trainer-dialogue");
  if (!dialogue) return; // Exit safely if not found

  dialogue.textContent = dialogueLines[dialogueIndex];
  dialogueIndex = (dialogueIndex + 1) % dialogueLines.length;
}


// Rotate every 5–10 seconds
setInterval(rotateDialogue, 6000); // 6 sec is good pacing

function showAboutMeLeftScreen() {
  document.getElementById("about-left");
  rotateDialogue(); // immediately show the first line
}


