import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/mesa-bg-music.m4a";
const BIOME_INTERACTABLES = [
    {
        xPercent: 52, 
        yPercent: 12, 
        text: "Eagles and hawks can be seen gliding across the skies as they scan the area for food."
    },
    {
        xPercent: 50, 
        yPercent: 55, 
        text: "A coyote walks along the edge of a tiny oasis, seeking shelter from the blazing sun."
    },
    {
        xPercent: 45, 
        yPercent: 32, 
        text: "A herd of bighorn sheep traverse the rocky terrain with ease, using it as a deterrent for predators if needed."
    },
    {
        xPercent: 76, 
        yPercent: 86, 
        text: "A lizard basks in the sun, keeping perfectly still as it soaks in the heat."
    },
    {
        xPercent: 10, 
        yPercent: 20, 
        text: "This is a mesa, a large geological structure that is formed by erosion over the course of millions of years."
    },
]

setUpSoundBiome(AUDIO_SOURCE);
BIOME_INTERACTABLES.forEach((circle) => createBlurCircle(circle.xPercent, circle.yPercent, circle.text));