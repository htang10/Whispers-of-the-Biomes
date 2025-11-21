import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../assets/ambient-sound/tundra-bg-music.m4a";
const HOTSPOTS = [
    {
        xPercent: 30,
        yPercent: 80,
        text: `The tundra holds ancient ice that's older than human civilization. Some layers of permafrost have been 
        frozen for more than 100,000 years, long before the first cities existed. When parts of it melt, it can release 
        perfectly preserved plants, seeds, and even trapped air from an ancient atmosphere.`
    },
    {
        xPercent: 80,
        yPercent: 80,
        text: `Some tundra plants grow in tight, round "cushions" to survive the cold. Their shape traps heat
        inside, creating a tiny warm zone that can be much hotter than the air around them.`
    },
    {
        xPercent: 63,
        yPercent: 55,
        text: `Animals in the tundra often change color with the seasons. Species like arctic foxes and hares
        turn white in winter for camouflage, then shift back to brown or gray in summer.`
    },
    {
        xPercent: 75,
        yPercent: 30,
        text: `Caribou make one of the longest land migrations on the planet. Some herds travel more than 3,000 
        kilometers each year, moving through frozen rivers, valleys, and wide open tundra. Their huge seasonal journey 
        is so large that it can even be seen from space when the herd is at full size.`
    },
    {
        xPercent: 50,
        yPercent: 20,
        text: `Tundra can create natural mirages. Cold air layers bend light in strange ways, making far-away objects look
        stretched, floating, or doubled. This is why distant herds or mountains can appear ghostly on the horizon.`
    }
];

setUpSoundBiome(AUDIO_SOURCE);
HOTSPOTS.forEach(hotspot => {
    createBlurCircle(hotspot.xPercent, hotspot.yPercent, hotspot.text);
});