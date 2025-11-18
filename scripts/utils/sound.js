const ANIMATION_DURATION = 4000;

/**
 * Initializes and controls the ambient background sound for the homepage.
 *
 * Creates an Audio object on first user interaction (unmuting) to comply
 * with browser autoplay restrictions. The audio loops continuously in
 * the background and can be muted or unmuted without pausing playback.
 * Updates the mute button icon dynamically to reflect the current state.
 *
 * Logic Flow:
 *   1. Wait for user to click the mute button (first interaction)
 *   2. Create and configure the Audio object (loop, volume, muted)
 *   3. Toggle the mute state on each click
 *   4. Update the mute icon (🔇 / 🔊) accordingly
 *
 * @returns {void}
 */
export function baseSetUpSound(src) {
  const muteBtn = document.getElementById("mute-btn");
  if (!muteBtn) return; // Exit early if mute button is missing
  
  let audio;
  
  muteBtn.addEventListener("click", () => {
    if (!audio) {
      audio = new Audio(src);
      audio.loop = true;
      audio.volume = 1;
      audio.muted = true;
    }
    
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    if (!audio.muted) {
      audio.play();
    }
  });
}

export function setUpSoundBiome(src) {
  setTimeout(() => {
    baseSetUpSound(src);
  }, ANIMATION_DURATION)
}
