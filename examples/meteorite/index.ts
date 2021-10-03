import { Spells } from "./spells/mod.ts";
import {
  buildModSettings,
  defaultChoices,
  addSpells,
  saveToFile,
} from "../../src/mod.ts";

let Mod: AcolyteFightMod = {
  Mod: buildModSettings({
    name: "Modlyte Example",
    author: "voxal",
    description: "Example of how to use modlyte",
    // I omit title, it will automatically split it into ["Modlyte", "Example"]
    subtitle: ["Simpler", "Modding"],
  }),
  Spells,
  Choices: {
    ...defaultChoices,
    Options: addSpells({ a: [, , ["modeorite"]] }),
  },
};
saveToFile("modeorite.json", Mod);
