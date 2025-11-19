import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/forest-bg-music.m4a";
const BIOME_INTERACTABLES = [
    {
        xPercent: 19, 
        yPercent: 18, 
        text: "This is a majestic oak tree, standing tall and proud in the heart of the forest."
    },
    {
        xPercent: 30, 
        yPercent: 53, 
        text: "A deer quietly grazes along the streams edge."
    },
    {
        xPercent: 10, 
        yPercent: 51, 
        text: "A squirrel sits comfortably on top of a mossy tree trunk as it scans the area for food."
    },
    {
        xPercent: 75, 
        yPercent: 32, 
        text: "A woodpecker chips at the side of a tree, slowly but surely creating a home for itself."
    },
    {
        xPercent: 69, 
        yPercent: 58, 
        text: "A fox treads silently through the forest, its movements are smooth and alert."
    },
]

setUpSoundBiome(AUDIO_SOURCE);
BIOME_INTERACTABLES.forEach((circle) => createBlurCircle(circle.xPercent, circle.yPercent, circle.text));
