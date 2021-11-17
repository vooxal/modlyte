import { Spells } from "./spells/mod.ts";
import {
  buildModSettings,
  saveToFile,
} from "../../src/mod.ts";

const Mod: AcolyteFightMod = {
  Mod: buildModSettings({
    name: "Modlyte Example",
    author: "voxal",
    description: "Example of how to use modlyte",
    // I omit title, it will automatically split it into ["Modlyte", "Example"]
    subtitle: ["Simpler", "Modding"],
  }),
  Spells,
};

saveToFile("modeorite.json", Mod);
