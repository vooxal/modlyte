import { HatcherError } from "../utilities/error.ts";
import { Registry } from "./Registry.ts";
import { sortVersions } from "../utilities/utils.ts";
export class Npm extends Registry {
  static domain = "npmjs.com";
  static async sortedVersions(module, owner) {
    const res = await fetch("https://registry.npmjs.org/" + module);
    const json = await res.json();
    if (!json.versions) {
      throw new HatcherError(
        `Unable to get latest version: ${module} ${owner}`,
      );
    }
    return sortVersions(Object.keys(json.versions));
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnBtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTnBtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVyRCxNQUFNLE9BQU8sR0FBSSxTQUFRLFFBQVE7SUFDL0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7SUFHNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQ3pCLE1BQWMsRUFDZCxLQUFjO1FBRWQsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsNkJBQTZCLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFJLEdBQVksTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsTUFBTSxJQUFJLFlBQVksQ0FDcEIsaUNBQWlDLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FDbkQsQ0FBQztTQUNIO1FBQ0QsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDIn0=
