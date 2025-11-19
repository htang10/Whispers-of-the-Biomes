import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/caldera-bg-music.m4a";
const BIOME_INTERACTABLES = [
    {
        xPercent: 32, 
        yPercent: 8, 
        text: "Eagle."
    },
    {
        xPercent: 35, 
        yPercent: 45, 
        text: "Elk."
    },
    {
        xPercent: 55, 
        yPercent: 68, 
        text: "Fox."
    },
    {
        xPercent: 56, 
        yPercent: 40, 
        text: "Lake."
    },
    {
        xPercent: 65, 
        yPercent: 18, 
        text: "Caldera."
    },
]

setUpSoundBiome(AUDIO_SOURCE);
BIOME_INTERACTABLES.forEach((circle) => createBlurCircle(circle.xPercent, circle.yPercent, circle.text));