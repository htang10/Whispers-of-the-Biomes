// handle the biome interface
function handleBiomeFunct() {
  let biome = getBiome();
  // console.log(page);
  if (biome != undefined) {
    createSplash(biome);
  } else {
    createSplash("Welcome");
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

  // splash text
  let splashText = document.createElement("div");
  splashText.className = "intro";
  splashText.innerHTML =
    "<h2 class='line'>" + (title ? title : "Welcome!") + "</h2>";
  splashDiv.appendChild(splashText);
  document.body.appendChild(splashDiv);

  trackPageStatus();
}

function trackPageStatus() {
  // tracking if timer is done and page is loaded
  let script = document.getElementById("biomeScript");
  let minTime = 4000;

  // checks if script is loaded
  script.onload = function () {
    // hide splash after minimum time and if page is loaded
    setTimeout(() => {
      timerDone = true;
      hideSplash();
      handleButtons();
    }, minTime);
  };
}

function hideSplash() {
  let splashDiv = document.getElementById("splashDiv");
  splashDiv.classList.add("hide");
  splashDiv.addEventListener("transitionend", () => splashDiv.remove());
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

  // creating header element
  let header = document.createElement("div");
  header.className = "header hideTop";
  header.innerText = biome.toUpperCase();
  document.body.appendChild(header);

  // left btn
  let leftBtn = document.createElement("a");
  leftBtn.className = "sticky left hideLeft " + prevBiome;
  leftBtn.innerText = prevBiome.toUpperCase();
  leftBtn.href = `./${prevBiome}`;
  document.body.appendChild(leftBtn);

  // right btn
  let rightBtn = document.createElement("a");
  rightBtn.className = "sticky right hideRight " + nextBiome;
  rightBtn.innerText = nextBiome.toUpperCase();
  rightBtn.href = `./${nextBiome}`;
  document.body.appendChild(rightBtn);

  setTimeout(() => {
    header.classList.remove("hideTop");
    leftBtn.classList.remove("hideLeft");
    rightBtn.classList.remove("hideRight");
  }, 2000);
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
