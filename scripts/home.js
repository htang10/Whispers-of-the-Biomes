/**
 * ======================================================
 *  home.js — Core logic for Whispers of the Biomes
 * ======================================================
 * Handles:
 *  1. Intro scene fade-out after animation
 *  2. Interactive biome navigation (buttons, scroll, keys)
 *  3. Smooth transitions between biomes
 * ------------------------------------------------------
 * Each biome element cycles between:
 *   - prev  → previous biome (left)
 *   - active → current biome (center)
 *   - next  → next biome (right)
 *
 * The logic ensures smooth switching via:
 *   - click (on next/prev)
 *   - scroll (wheel)
 *   - keyboard arrows
 * ======================================================
 */


// === Global Constants ===
const INTRO_FADE_OUT = 4000; // Duration (ms) of intro fade-out
const INTRO_TOTAL = 9000; // Total intro text display time before fade starts
const UI_LOCKED_DURATION = 500; // Lock UI briefly to prevent rapid switching

// ======================================================
// 1. Intro Scene Setup
// ======================================================
/**
 * Handles the introductory text animation fade-out sequence.
 * Waits for the full intro to finish, then hides the element.
 */
function initIntro() {
  const introScene = document.getElementById("intro");
  if (!introScene) return; // skip if intro is disabled in HTML

  // Wait for total animation time before fading out
  setTimeout(() => {
    introScene.classList.add("fade-out");
    // After fade completes, remove the intro scene entirely
    setTimeout(() => {
      introScene.style.display = "none";
    }, INTRO_FADE_OUT);
  }, INTRO_TOTAL);
}


// ======================================================
// 2. Biome Navigation Setup
// ======================================================
/**
 * Initializes all biome navigation controls and transition logic.
 * - Tracks current, previous, and next biomes
 * - Handles user interaction (click, scroll, arrow keys)
 * - Ensures transitions are smooth and locked temporarily
 */
function initBiomeControls() {
  const buttonGroup = document.querySelector("#biomes");
  const biomes = Array.from(buttonGroup.children); // All biome buttons
  let idx = 0; // Start from the first biome
  let content;

  // Initial element references
  let prev = biomes.at(-1); // last biome (wrap-around)
  let current = biomes[idx]; // active biome
  let next = biomes[idx + 1]; // next biome

  /**
   * Temporarily disables user interaction during transitions.
   * Prevents users from double-clicking while elements move.
   */
  function lockUI() {
    buttonGroup.style.pointerEvents = "none";
    current.classList.add("no-transition");
    setTimeout(() => {
      buttonGroup.style.pointerEvents = "auto";
      current.classList.remove("no-transition");
    }, UI_LOCKED_DURATION);
  }

  /**
   * Hides the text of the current active biome to improve UI appearance.
   * Using empty text instead of transparent color prevents users from 
   * accidentally seeing or selecting hidden text, especially on mobile.
   */
  function hideContent() {
    const active = document.querySelector('.active');
    content = active.textContent;
    active.textContent = "";
  }

  /**
   * Restores the hidden text of a previously active biome after transition.
   * @param {HTMLElement} element - The biome element to restore text to.
   */
  function restoreContent(element) {
    element.textContent = content;
  }

  /**
   * Updates the biome moving *out* of the active state.
   * @param {HTMLElement} target - The biome to deactivate (prev or next)
   * @param {number} direction - +1 for forward, -1 for backward
   * @returns {HTMLElement} - The updated element reference
   */
  function updateCurrentInactive(target, direction) {
    let clsToRemove, clsToAdd, targetEvent;
    if (direction === 1) {
      // Moving forward
      clsToRemove = "prev";
      clsToAdd = "prev";
      targetEvent = backward;
    } else {
      // Moving backward
      clsToRemove = "next";
      clsToAdd = "next";
      targetEvent = forward;
    }

    // Deactivate previous biome
    target.classList.remove(clsToRemove, "animate-enter");
    target.removeEventListener("click", targetEvent);

    // The current biome becomes inactive (now prev or next)
    const newTarget = current;
    newTarget.classList.remove("active");
    newTarget.classList.add(clsToAdd);
    newTarget.addEventListener("click", targetEvent);

    return newTarget;
  }

  /**
   * Updates the current active biome element.
   * @param {number} index - New active biome index
   * @param {number} direction - +1 forward / -1 backward
   */
  function updateCurrent(index, direction) {
    let clsToRemove, targetEvent;
    if (direction === 1) {
      clsToRemove = "next";
      targetEvent = forward;
    } else {
      clsToRemove = "prev";
      targetEvent = backward;
    }

    current = biomes[index];
    current.classList.remove(clsToRemove, "animate-enter");
    current.removeEventListener("click", targetEvent);
    current.addEventListener("click", function () {
      console.log("hello");
    });
    current.classList.add("active");
    hideContent(); // always hide the text content of the currently active biome
  }

  /**
   * Prepares the biome that will appear *next* in the direction of movement.
   * Adds the proper CSS classes and click handler.
   * @param {number} direction - +1 forward / -1 backward
   * @returns {HTMLElement} - The new next/prev biome element
   */
  function updateNextInactive(direction) {
    let clsToAdd, targetEvent;
    if (direction === 1) {
      clsToAdd = "next";
      targetEvent = forward;
    } else {
      clsToAdd = "prev";
      targetEvent = backward;
    }

    const nextInactiveBiome =
      biomes[(idx + direction + biomes.length) % biomes.length];
    nextInactiveBiome.classList.add(clsToAdd, "animate-enter");
    nextInactiveBiome.addEventListener("click", targetEvent);
    return nextInactiveBiome;
  }

  /**
   * Moves the biome display forward (rightward / next).
   */
  function forward() {
    prev = updateCurrentInactive(prev, 1); // make previous biome inactive
    restoreContent(prev); // restore the content of the new "prev" biome
    idx = ++idx % biomes.length; // move index forward cyclically
    updateCurrent(idx, 1); // activate the new current biome
    lockUI(); // lock temporarily
    next = updateNextInactive(1); // prepare the new "next" biome
  }

  /**
   * Moves the biome display backward (leftward / previous).
   */
  function backward() {
    next = updateCurrentInactive(next, -1); // make next biome inactive
    restoreContent(next); // restore the text content of the new "next" biome
    idx = ((--idx % biomes.length) + biomes.length) % biomes.length; // move index backward safely
    updateCurrent(idx, -1); // activate the new current biome
    lockUI(); // lock temporarily
    prev = updateNextInactive(-1); // prepare the new "prev" biome
  }

  // Scroll wheel navigation
  buttonGroup.addEventListener("wheel", (event) => {
    if (event.deltaY > 0 || event.deltaX < 0) {
      forward(); // scroll down/right → next biome
    } else if (event.deltaY < 0 || event.deltaX > 0) {
      backward(); // scroll up/left → previous biome
    }
  });

  // let startX = 0;
  // let currentX = 0;
  // let isDragging = false;

  // buttonGroup.addEventListener("touchstart", (e) => {
  //   startX = e.touches[0].clientX;
  //   isDragging = true;
  // });

  // buttonGroup.addEventListener("touchmove", (e) => {
  //   if (!isDragging) return;

  //   currentX = e.touches[0].clientX;
  //   const diff = currentX - startX;
  //   const threshold = window.innerWidth * 0.25; // 25% of screen width
  //   const progress = Math.max(-1, Math.min(1, diff / threshold)); // clamp to [-1, 1]

  //   // Move the active and neighbor buttons smoothly
  //   const active = document.querySelector(".active");
  //   const prev = document.querySelector(".prev");
  //   const next = document.querySelector(".next");

  //   // Move active slightly opposite to swipe
  //   active.style.transform = `translateX(${progress * 20}%)`;

  //   // Move neighbors closer in
  //   if (diff > 0 && prev)
  //     prev.style.transform = `translateX(calc(-20vw + ${progress * 10}%))`;
  //   if (diff < 0 && next)
  //     next.style.transform = `translateX(calc(20vw + ${progress * 10}%))`;
  // });

  // buttonGroup.addEventListener("touchend", () => {
  //   isDragging = false;
  //   const diff = currentX - startX;
  //   const threshold = 50;

  //   // Decide whether to complete or snap back
  //   if (Math.abs(diff) > threshold) {
  //     if (diff < 0) forward();
  //     else backward();
  //   } else {
  //     // Snap back
  //     const active = document.querySelector(".active");
  //     const prev = document.querySelector(".prev");
  //     const next = document.querySelector(".next");
  //     active.style.transform = "";
  //     if (prev) prev.style.transform = "";
  //     if (next) next.style.transform = "";
  //   }

  //   startX = 0;
  //   currentX = 0;
  // });

  // Click navigation
  prev.addEventListener("click", backward);
  current.addEventListener("click", function () {
    console.log("hello");
  });
  next.addEventListener("click", forward);
  hideContent();

  // Keyboard arrow navigation
  document.body.addEventListener("keydown", (event) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) forward();
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) backward();
  });
}


// ======================================================
// 3. Initialization
// ======================================================
/**
 * Runs intro and biome setup once the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  initIntro();
  initBiomeControls();
});
