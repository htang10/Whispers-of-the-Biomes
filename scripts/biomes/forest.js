import { setUpSoundBiome } from "../utils/sound.js";
import { createBlurCircle } from "./biomeInterface.js";

const AUDIO_SOURCE = "../../assets/forest/forest-bg-music.m4a";
const TREE = "This is a majestic oak tree, standing tall and proud in the heart of the forest.";

setUpSoundBiome(AUDIO_SOURCE);
createBlurCircle(75, 65, TREE);
createBlurCircle(90, 30, TREE);
