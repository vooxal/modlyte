export let defaultModSettings: ModSettings = {
  name: "Your Mod",
  author: "You!",
  description: new Date(),

  titleLeft: "Acolyte", // On the homepage, this text flies in from left
  titleRight: "Fight", // On the homepage, this text flies in from right

  subtitleLeft: "",
  subtitleRight: "",

  private: false, // If true, other players in a party will be unable to see the contents of the mod
}

interface BuildModSettingsArgs {
  name: string;
  author: string;
  description?: string;
  title?: string[];
  subtitle?: string[];
  //@ts-ignore this is madness
  private?: boolean;
}

export const buildModSettings = ({
  name,
  author,
  description = "",
  title = name.split(/ (.*)/),
  subtitle = ["", ""],
  //@ts-ignore this is madness
  private = false
}: BuildModSettingsArgs): ModSettings => {
  return {
    name,
    author,
    titleLeft: title[0],
    titleRight: title[1],
    subtitleLeft: subtitle[0],
    subtitleRight: subtitle[1],
    //@ts-ignore this is madness
    private: private,
  }
}
