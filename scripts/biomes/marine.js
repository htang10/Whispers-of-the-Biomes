import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/marine-bg-music.m4a";
const HOTSPOTS = [
    {
        xPercent: 30,
        yPercent: 2,
        text: `Sunlight can travel surprisingly deep in clear coastal water.
        In bright conditions, sunlight can reach around 200 meters, creating those long, visible
        light beams that let plants and corals grow far below the surface.`
    },
    {
        xPercent: 15,
        yPercent: 55,
        text: `Some coral species can survive in cooler, low-light areas by slowing their metabolism.
        That's why they can live even in spots with only gentle sunlight like this. They switch into 
        "energy-saving mode" when light is limited.`
    },
    {
        xPercent: 47,
        yPercent: 80,
        text: `Marine sand ripples form naturally from steady underwater currents.
        These smooth, wave-like patterns aren't random. They're shaped as water pushes grains back and forth over time.`
    },
    {
        xPercent: 61.5,
        yPercent: 30,
        text: `Bioluminescent life is more common than we think. In deep water, glowing organisms are everywhere,
        using light to attract prey, confuse predators, or communicate.`
    },
    {
        xPercent: 40,
        yPercent: 65,
        text: `The ocean floor can "smoke" without being hot. Cold seeps release gas from the seabed,
        creating ghost-like plumes that look like underwater smoke rising into the water.`
    }
];

setUpSoundBiome(AUDIO_SOURCE);
HOTSPOTS.forEach(hotspot => {
    createBlurCircle(hotspot.xPercent, hotspot.yPercent, hotspot.text);
});