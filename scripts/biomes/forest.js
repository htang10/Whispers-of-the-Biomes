import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/forest-bg-music.m4a";
const HOTSPOTS = [
    {
        xPercent: 63,
        yPercent: 90,
        text: `Trees use an underground network to share signals and nutrients.
        Their roots connect with fungi, forming a hidden "forest internet" that lets trees warn
        each other about danger and support weaker trees.`
    },
    {
        xPercent: 58,
        yPercent: 67,
        text: `A teaspoon of forest soil holds more life than the entire human population.
        Tiny creatures, such as bacteria, fungi, and micro-insects, create a massive unseen world beneath our feet.`
    },
    {
        xPercent: 4,
        yPercent: 30,
        text: `Large forests can make their own rain. Trees release moisture into the air,
        and when millions do it together, they help shape the weather and bring rainfall back to the forest.`
    },
    {
        xPercent: 25,
        yPercent: 75,
        text: `Fallen logs act like natural incubators for new trees.
        These "nurse logs" store water and nutrients, giving young seedlings a better chance to grow.`
    },
    {
        xPercent: 65,
        yPercent: 30,
        text: `Some forests have a single “giant” tree that stands far above the rest.
        These huge elders store massive amounts of carbon, shape the sunlight below, and even hold
        small plants and moss growing high on their branches—almost like a mini-ecosystem living in the sky.`
    }
];

setUpSoundBiome(AUDIO_SOURCE);
HOTSPOTS.forEach(hotspot => {
    createBlurCircle(hotspot.xPercent, hotspot.yPercent, hotspot.text);
});
