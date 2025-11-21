import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/mesa-bg-music.m4a";
const HOTSPOTS = [
    {
        xPercent: 70,
        yPercent: 9,
        text: `Mesas form when soft rock erodes away, leaving a flat "tabletop" of harder rock on top.
        That cap rock acts like a shield, protecting the mesa while everything around it wears down.`
    },
    {
        xPercent: 55,
        yPercent: 20,
        text: `The red color of the mesa walls comes from iron in the rock slowly rusting over millions of years.
        Sunlight makes this “rusted rock” glow even more, which is why mesas look especially bright at sunrise and sunset.`
    },
    {
        xPercent: 53,
        yPercent: 55,
        text: `Desert plants around mesas grow low and wide to survive heat and hold onto rare water.
        Shrubs and yucca spread their roots far to collect moisture before it evaporates.`
    },
    {
        xPercent: 30,
        yPercent: 85,
        text: `Mesas often rise from wide, flat plains that used to be ancient riverbeds or flood zones.
        The cracked ground and scattered shrubs show how dry the land has become compared to its wetter past.`
    },
    {
        xPercent: 73,
        yPercent: 76,
        text: `Many mesas have isolated wildlife that adapts to the heat and rocky ground. Warm surfaces give reptiles
        and similar animals the quick burst of energy they need to hunt and stay alert in a harsh desert.`
    }
];

setUpSoundBiome(AUDIO_SOURCE);
HOTSPOTS.forEach(hotspot => {
    createBlurCircle(hotspot.xPercent, hotspot.yPercent, hotspot.text);
});