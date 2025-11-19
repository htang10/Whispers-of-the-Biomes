import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/tundra-bg-music.m4a";
const BIOME_INTERACTABLES = [
    {
        xPercent: 88, 
        yPercent: 44, 
        text: "Snowy Owl."
    },
    {
        xPercent: 58, 
        yPercent: 49, 
        text: "Caribou."
    },
    {
        xPercent: 38, 
        yPercent: 57, 
        text: "Arctic Fox."
    },
    {
        xPercent: 38, 
        yPercent: 88, 
        text: "Thick-Billed Murres."
    },
    {
        xPercent: 10, 
        yPercent: 20, 
        text: "In the summertime, areas within the arctic circle can experience 24 hours of sunlight due to Earth's axial tilt."
    },
]

setUpSoundBiome(AUDIO_SOURCE);
BIOME_INTERACTABLES.forEach((circle) => createBlurCircle(circle.xPercent, circle.yPercent, circle.text));