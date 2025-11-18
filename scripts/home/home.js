/**
 * ======================================================
 * File: home.js
 * Project: Whispers of the Biomes
 * Author: Huy Tang
 * Last Updated: Nov 5, 2025
 * ======================================================
 * Purpose:
 *   Controls the homepage experience — including the intro sequence,
 *   interactive biome navigation, and ambient sound toggle.
 *
 * Responsibilities:
 *   - Handle intro text fade-in/out and skip logic for returning visitors
 *   - Manage biome slider transitions via click, scroll, key, or touch
 *   - Synchronize biome UI states (prev / active / next)
 *   - Control ambient sound and mute functionality
 *
 * Dependencies:
 *   - Standard DOM API (no external libraries)
 *
 * Key Features:
 *   - Smooth CSS-driven transitions for navigation
 *   - Lazy-loaded background sound to comply with autoplay policy
 *   - Persistent intro skip state using sessionStorage
 * ======================================================
 */


// ======================================================
// CONTENTS
// ------------------------------------------------------
// 0. Global Constants
// 1. Intro Scene Setup
// 2. Biome Navigation Control
// 3. Initialization
// ======================================================


// ======================================================
// 0. GLOBAL CONSTANTS AND IMPORTS
// ======================================================

import { setUpSound } from "../utils/sound.js";

const INTRO_FADE_OUT = 4000;                      // Duration (ms) of the fading out effect before hiding intro
const INTRO_TOTAL = 9000;                         // Total animation time for the intro scene before fading starts
const UI_LOCKED_DURATION = 500;                   // Duration (ms) to lock UI during biome transitions, ensuring smoothness
const AUDIO_SOURCE = "assets/home/home-bg-music.m4a";  // Path to the ambient background audio file


// ======================================================
// 1. INTRO SCENE SETUP
// ======================================================


/**
 * Initializes and manages the introductory text animation sequence.
 *
 * Displays the intro text on first visit, then automatically fades it out
 * and hides the intro screen after the animation finishes. Returning visitors
 * skip the intro entirely using session-based state.
 *
 * Logic Flow:
 *   1. Check if the user has visited before (via sessionStorage)
 *   2. If not, play the intro text animation
 *   3. After animation ends, fade out and hide the intro scene
 *   4. Mark session as "visited" to skip intro on next load
 *
 * @returns {void}
 */
function setUpIntro() {
  const introScene = document.getElementById("intro");
  if (!introScene) return; // Exit early if intro is missing

  // If the intro is already played once, it will be skipped until users close the current tab
  const visited = sessionStorage.getItem("visited");
  if (visited) {
    introScene.style.display = "none";
    return;
  }

  // Mark that intro was shown once (resets on new tab)
  sessionStorage.setItem("visited", true);

  // After intro animation finishes, start fading out
  setTimeout(() => {
    introScene.classList.add("fade-out");

    // Remove intro after fading completes
    setTimeout(() => {
      introScene.style.display = "none";
    }, INTRO_FADE_OUT);
  }, INTRO_TOTAL);
}


// ======================================================
// 2. BIOME NAVIGATION CONTROL
// ======================================================
// This section contains ALL logic for biome transitions
// and navigation methods (click, scroll, keyboard, touch).
// Subsections are organized as:
//   2.1 — Core Helper Functions (lockUI, hideContent, etc.)
//   2.2 — Transition Handlers (forward, backward)
//   2.3 — Navigation Inputs (scroll, keyboard, touch, click)
// ======================================================


/**
 * Initializes the interactive biome navigation system.
 *
 * Sets up the logic and event handling for switching between biomes
 * using buttons, scroll wheel, keyboard arrows, and touch gestures.
 * Manages active, previous, and next biome states to ensure smooth
 * visual transitions and temporarily locks the UI to prevent rapid inputs.
 *
 * Logic Flow:
 *   1. Identify biome elements and assign active/prev/next states
 *   2. Handle navigation via click, scroll, arrow keys, and swipe
 *   3. Smoothly transition between biomes with animation classes
 *   4. Temporarily disable input during transitions to avoid glitches
 *
 * @returns {void}
 */
function initBiomeControls() {
  const buttonGroup = document.querySelector("#biomes");
  const biomes = Array.from(buttonGroup.children); // All biome buttons
  let idx = 0; // Start from the first biome
  // Restore the last active biome if exists
  const savedBiome = sessionStorage.getItem("activeBiome");
  if (savedBiome) {
    const foundIndex = biomes.findIndex(b => b.id === savedBiome);
    if (foundIndex !== -1) idx = foundIndex;
  }
  let content;

  let prev = biomes[(idx - 1 + biomes.length) % biomes.length];;   // previous biome (wrap-around)
  let current = biomes[idx];  // active biome
  let next = biomes[(idx + 1) % biomes.length]; // next biome

  // Styling
  prev.classList.add("prev");
  current.classList.add("active");
  next.classList.add("next");
  
  // Click navigation
  prev.addEventListener("click", backward);
  current.addEventListener("click", redirectHandler);
  next.addEventListener("click", forward);
  hideContent();

  //* ---------- 2.1 Core Helper Functions ----------\


  /**
   * Temporarily disables biome navigation to prevent rapid input.
   *
   * Locks pointer events and disables transitions briefly
   * to ensure smooth and stable biome switching.
   *
   * @returns {void}
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
   * Hides the text content of the currently active biome button.
   *
   * Stores the text temporarily to restore it later,
   * preventing visual overlap or accidental selection.
   *
   * @returns {void}
   */
  function hideContent() {
    const active = document.querySelector(".active");
    content = active.textContent;
    active.textContent = "";
  }

  /**
   * Restores the previously hidden text to a biome button.
   *
   * @param {HTMLElement} element - The biome element to restore text to.
   * @returns {void}
   */
  function restoreContent(element) {
    element.textContent = content;
  }

  /**
   * Handles biome button redirection to its respective page.
   *
   * Dynamically retrieves the clicked biome’s ID and navigates
   * to its corresponding HTML page within the /pages directory.
   * Future updates may include transition animations or loading effects.
   *
   * Logic Flow:
   *   1. Identify which biome button was clicked (via element ID)
   *   2. Build the destination URL using that biome name
   *   3. Redirect the user to the corresponding biome page
   *
   * @param {Event} event - The click event triggered on a biome button.
   * @returns {void}
   */
  function redirect(event) {
    const biome = event.currentTarget.id;
    window.location.href = `pages/${biome}.html`;
  }

  /**
   * Wrapper handler for biome redirection.
   *
   * Serves as a persistent function reference for adding and removing
   * click event listeners that trigger biome page navigation. This is
   * necessary because passing anonymous arrow functions directly into
   * `addEventListener` or `removeEventListener` creates new references
   * each time, preventing proper event cleanup.
   *
   * Logic Flow:
   *   1. Invokes the main `redirect()` function with the received event.
   *   2. Ensures consistent reference for proper add/remove behavior.
   *
   * @param {Event} event - The click event triggered on a biome button.
   * @returns {void}
   */
  function redirectHandler(event) {
    redirect(event);
  }


  //* ---------- 2.2 Transition Handlers ----------


  /**
   * Deactivates the current biome as it transitions out of view.
   *
   * Removes its active state, assigns it as either the previous or next biome,
   * and updates event listeners for proper navigation direction.
   *
   * @param {HTMLElement} target - The biome element moving out of active state.
   * @param {number} direction - Direction of movement (+1 forward, -1 backward).
   * @returns {HTMLElement} The updated biome element reference.
   */
  function deactivateCurrentBiome(target, direction) {
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
    newTarget.removeEventListener("click", redirectHandler);
    newTarget.addEventListener("click", targetEvent);

    return newTarget;
  }

  /**
   * Activates the biome at the specified index and sets it as the new active biome.
   *
   * Removes the inactive class (prev/next), assigns the active state, and
   * attaches the click handler for future redirection. Also hides the biome’s
   * text content to enable smooth visual transitions.
   *
   * @param {number} index - Index of the biome to activate.
   * @param {number} direction - Direction of movement (+1 forward, -1 backward).
   * @returns {void}
   */
  function activateBiome(index, direction) {
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
    current.addEventListener("click", redirectHandler);
    current.classList.add("active");
    hideContent(); // always hide the text content of the currently active biome
  }

  /**
   * Prepares the biome that will appear next in the navigation sequence.
   *
   * Assigns the appropriate class (prev/next) and animation state based
   * on navigation direction, and attaches the corresponding event listener
   * for the upcoming transition.
   *
   * @param {number} direction - Direction of movement (+1 forward, -1 backward).
   * @returns {HTMLElement} The biome element prepared to become active next.
   */
  function prepareNextBiome(direction) {
    let clsToAdd, targetEvent;
    if (direction === 1) {
      clsToAdd = "next";
      targetEvent = forward;
    } else {
      clsToAdd = "prev";
      targetEvent = backward;
    }

    const nextInactiveBiome = biomes[(idx + direction + biomes.length) % biomes.length];
    nextInactiveBiome.classList.add(clsToAdd, "animate-enter");
    nextInactiveBiome.addEventListener("click", targetEvent);
    return nextInactiveBiome;
  }

  /**
   * Advances the biome carousel forward to the next biome.
   *
   * Handles the full forward transition sequence:
   *   1. Deactivates the current biome and shifts it to the previous position.
   *   2. Restores text for the new previous biome.
   *   3. Updates the index to the next biome cyclically.
   *   4. Activates the next biome and locks UI temporarily.
   *   5. Prepares the following biome for smooth entry.
   *
   * @returns {void}
   */
  function forward() {
    prev = deactivateCurrentBiome(prev, 1);      // Make previous biome inactive
    restoreContent(prev);                        // Restore text for the new prev biome
    idx = ++idx % biomes.length;                 // Move index forward cyclically
    activateBiome(idx, 1);                       // Activate the new current biome
    lockUI();                                    // Temporarily disable inputs
    next = prepareNextBiome(1);                  // Set up the next biome for transition
  }

  /**
   * Moves the biome carousel backward to the previous biome.
   *
   * Handles the full backward transition sequence:
   *   1. Deactivates the current biome and shifts it to the next position.
   *   2. Restores text for the new next biome.
   *   3. Updates the index to the previous biome safely (cyclic wrap-around).
   *   4. Activates the previous biome and locks UI temporarily.
   *   5. Prepares the preceding biome for the next potential transition.
   *
   * @returns {void}
   */
  function backward() {
    next = deactivateCurrentBiome(next, -1);     // Make next biome inactive
    restoreContent(next);                         // Restore text for the new next biome
    idx = ((--idx % biomes.length) + biomes.length) % biomes.length; // Move index backward safely
    activateBiome(idx, -1);                       // Activate the new current biome
    lockUI();                                     // Temporarily disable inputs
    prev = prepareNextBiome(-1);                  // Set up the previous biome for transition
  }


  //* ---------- 2.3 Navigation Inputs ----------


  // Scroll wheel navigation
  buttonGroup.addEventListener("wheel", (event) => {
    if (event.deltaY > 0 || event.deltaX < 0) {
      forward(); // scroll down/right → next biome
    } else if (event.deltaY < 0 || event.deltaX > 0) {
      backward(); // scroll up/left → previous biome
    }
  });

  // Keyboard arrow navigation
  document.body.addEventListener("keydown", (event) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) forward();
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) backward();
  });

  // Dragging navigation (For mobile users)
  let startX = 0;
  let currentX = 0;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  buttonGroup.addEventListener("touchstart", (e) => {
    startX = currentX = e.touches[0].clientX;
    startY = currentY = e.touches[0].clientY;
    isDragging = true;
  });

  buttonGroup.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
  });

  buttonGroup.addEventListener("touchend", () => {
    isDragging = false;
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    const threshold = 50;

    // Only trigger horizontal swipe navigation if the swipe is mostly horizontal.
    // This prevents accidental diagonal or vertical swipes from changing biomes.
    if (Math.abs(diffX) >= threshold && Math.abs(diffY) < threshold) {
      if (diffX < 0) {
        forward();
      } else {
        backward();
      }
    }

    startX = currentX = startY = currentY = 0;
  });
}


// ======================================================
// 3. INITIALIZATION
// ======================================================


document.addEventListener("DOMContentLoaded", () => {
  setUpIntro();
  initBiomeControls();
  setUpSound(AUDIO_SOURCE);
});
