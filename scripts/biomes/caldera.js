import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/caldera-audio.m4a";
const HOTSPOTS = [
    {
        xPercent: 60,
        yPercent: 20,
        text: `Some caldera eruptions were so large they changed global climate.
        A single caldera-forming blast can cool the entire planet for years by sending ash high into the atmosphere.`
    },
    {
        xPercent: 40,
        yPercent: 45,
        text: `Calderas can stay active for hundreds of thousands of years even if they look quiet.
        Many have hidden magma chambers warming the ground beneath your feet, long after the last big eruption.`
    },
    {
        xPercent: 45,
        yPercent: 55,
        text: `Some of the clearest lakes on Earth sit inside calderas.
        Because no rivers flow in, their water is filtered only by rain and snow, creating unbelievable visibility.`
    },
    {
        xPercent: 20,
        yPercent: 30,
        text: `Calderas often have "floating" pieces of land inside them.
        After the collapse, blocks of rock can slowly rise or sink like giant rafts as magma moves below.`
    },
    {
        xPercent: 80,
        yPercent: 83,
        text: `Animals sometimes rely on calderas for warmth in cold regions.
        Hot springs and warm soil create small pockets where plants grow earlier in spring, 
        attracting wildlife looking for heat and food.`
    }
];

setUpSoundBiome(AUDIO_SOURCE);
HOTSPOTS.forEach(hotspot => {
    createBlurCircle(hotspot.xPercent, hotspot.yPercent, hotspot.text);
});