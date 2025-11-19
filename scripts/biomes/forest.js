import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/forest-bg-music.m4a";
const BIOME_INTERACTABLES = [
    {
        xPercent: 75, 
        yPercent: 65, 
        text: "This is a majestic oak tree, standing tall and proud in the heart of the forest."
    }
]

setUpSoundBiome(AUDIO_SOURCE);
BIOME_INTERACTABLES.forEach((circle) => createBlurCircle(circle.xPercent, circle.yPercent, circle.text));
