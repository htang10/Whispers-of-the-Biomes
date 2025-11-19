import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/marine-bg-music.m4a";
const BIOME_INTERACTABLES = [
    {
        xPercent: 36, 
        yPercent: 39, 
        text: "Sea Turtle."
    },
    {
        xPercent: 48, 
        yPercent: 90, 
        text: "Crab."
    },
    {
        xPercent: 70, 
        yPercent: 60, 
        text: "Coral."
    },
    {
        xPercent: 38, 
        yPercent: 94, 
        text: "Starfish."
    },
    {
        xPercent: 15, 
        yPercent: 36, 
        text: "Fish-left."
    },
    {
        xPercent: 70, 
        yPercent: 38, 
        text: "Fish-right."
    },
]

setUpSoundBiome(AUDIO_SOURCE);
BIOME_INTERACTABLES.forEach((circle) => createBlurCircle(circle.xPercent, circle.yPercent, circle.text));