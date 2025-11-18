const ANIMATION_DURATION = 2000;

// handle the biome interface
function handleBiomeFunct() {
  let biome = getBiome();
  // console.log(page);
  if (biome != undefined) {
    sessionStorage.setItem("activeBiome", biome); // Keep track of the current active biome
    createSplash(biome);
  } else {
    createSplash("Welcome!");
  }
}

handleBiomeFunct();

// get the current biome page
function getBiome() {
  let biomes = ["forest", "mesa", "caldera", "marine", "tundra"];
  let title = document.title.toLowerCase(); // normalize case
  let page = undefined; // figure out the page we're on

  for (let biome of biomes) {
    if (title.includes(biome)) page = biome; // ignores the Whispers of the Biomes in the title
  }

  return page;
}

// create splash screen that serves as loading page
function createSplash(title) {
  // create splash screen div
  let splashDiv = document.createElement("div");
  splashDiv.className = "splash-div " + title;
  splashDiv.id = "splashDiv";

  splashDiv.innerHTML = "<h2 class='line'>" + title + "</h2>"; // will print biome name or "Welcome!"
  document.body.appendChild(splashDiv);

  trackPageStatus();
}

function trackPageStatus() {
  // checks if DOM is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // hide splash after minimum time and if page is loaded
    setTimeout(() => {
      hideSplash();
      handleButtons();
    }, ANIMATION_DURATION);
  });
}

function hideSplash() {
  let splashDiv = document.getElementById("splashDiv");
  splashDiv.addEventListener("animationend", () => splashDiv.remove());
}

// create sticky elements that will serve as user interface
function handleButtons() {
  let biomes = ["forest", "mesa", "caldera", "marine", "tundra"];
  let biome = getBiome();
  let currentIndex = biomes.indexOf(biome);

  // figure out the prev and next biomes
  let prevBiome = biomes[(currentIndex - 1 + biomes.length) % biomes.length];
  let nextBiome = biomes[(currentIndex + 1) % biomes.length];
  // console.log(prevBiome, nextBiome);

  // back button to Earth
  let backBtn = createBackButton();
  document.body.appendChild(backBtn);

  // ambient sound btn
  let soundBtn = document.createElement("button");
  soundBtn.className = "hideRight";
  soundBtn.id = "mute-btn";
  soundBtn.textContent = "🔇";
  document.body.appendChild(soundBtn);

  // left btn
  let leftBtn = document.createElement("a");
  leftBtn.className = "stickyBtn left hideLeft " + prevBiome;
  leftBtn.innerText = prevBiome.toUpperCase();
  leftBtn.href = `./${prevBiome}.html`;
  document.body.appendChild(leftBtn);

  // right btn
  let rightBtn = document.createElement("a");
  rightBtn.className = "stickyBtn right hideRight " + nextBiome;
  rightBtn.innerText = nextBiome.toUpperCase();
  rightBtn.href = `./${nextBiome}.html`;
  document.body.appendChild(rightBtn);

  setTimeout(() => {
    backBtn.classList.remove("hideLeft");
    soundBtn.classList.remove("hideRight");
    leftBtn.classList.remove("hideLeft");
    rightBtn.classList.remove("hideRight");
  }, ANIMATION_DURATION);
}

function createBackButton() {
  const link = document.createElement("a");
  link.href = "../index.html";
  link.className = "back-button hideLeft";

  // Main div
  const mainDiv = document.createElement("div");
  mainDiv.className = "back-button main";

  const mainLabel = document.createElement("span");
  mainLabel.className = "label";
  mainLabel.textContent = "↺";

  mainDiv.appendChild(mainLabel);

  // Extended div
  const extendedDiv = document.createElement("div");
  extendedDiv.className = "back-button extended";

  const extendedLabel = document.createElement("span");
  extendedLabel.className = "label";
  extendedLabel.textContent = "Back to Earth";

  extendedDiv.appendChild(extendedLabel);

  // Put everything together
  link.appendChild(mainDiv);
  link.appendChild(extendedDiv);

  return link;
}


/*
    To do:
        - Create sticky button functionality
        - Create get Biome function
        - Create css page
        - Adjust the splash timer to act as loading screen
        - Adjust zoom
        - Add to git and merge
        - OPTIONAL: adjust styling
*/

/**
 * Creates an interactive blurred circle with a descriptive popup.
 *
 * (xPercent, yPercent) represent a position RELATIVE TO THE IMAGE.
 *
 * These percentages are converted into pixel coordinates based on the
 * displayed size of the image, ensuring the circle stays in the correct
 * location even when the image scales on different screens.
 *
 * @param {number} xPercent - Horizontal position relative to image width (0–100)
 * @param {number} yPercent - Vertical position relative to image height (0–100)
 * @param {string} text - The popup text shown when circle is clicked
 */
export function createBlurCircle(xPercent, yPercent, text) {
  const container = document.querySelector(".bg-container");
  const img = container.querySelector(".bg-image");

  const circle = document.createElement("div");
  circle.className = "blur-circle";

  const popup = document.createElement("div");
  popup.className = "circle-popup";
  popup.textContent = text;

  container.appendChild(circle);
  container.appendChild(popup);

  function positionCircle() {
    const imgWidth = img.clientWidth;
    const imgHeight = img.clientHeight;

    const xPx = (xPercent / 100) * imgWidth;
    const yPx = (yPercent / 100) * imgHeight;

    circle.style.left = `${xPx}px`;
    circle.style.top = `${yPx}px`;
  }

  if (img.complete) {
    positionCircle();
  } else {
    img.addEventListener("load", positionCircle, { once: true });
  }

  window.addEventListener("resize", positionCircle);

  // Show/hide popup on click
  circle.addEventListener("click", function () {
    popup.classList.toggle("visible");
    // Clicking on the popup hides it again
    popup.addEventListener("click", () => {
      popup.classList.remove("visible");
    });
  });
}

/**
 * Centers the background image when users entering the site
 */
function centerBackground() {
  const container = document.querySelector(".bg-container");
  if (!container) return;

  const scrollWidth = (container.scrollWidth - window.innerWidth) / 2;
  container.scrollLeft = scrollWidth;
}

// Center background on load
document.addEventListener("DOMContentLoaded", centerBackground);

// Recenter background on browser resize
window.addEventListener("resize", centerBackground);
