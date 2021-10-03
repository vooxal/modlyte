import { log } from "./logger.ts";
import { isScriptObject } from "./util.ts";
import { hooks } from "./git_hooks.ts";
import { didYouMean } from "./did_you_mean.ts";
import { blue, red } from "../deps.ts";
import { ValidationError } from "../deps.ts";
export function validateConfigData(configData) {
  if (!configData) {
    throw new ValidationError("No scripts file found.");
  }
  if (
    !configData.config?.scripts ||
    Object.entries(configData.config?.scripts).length < 1
  ) {
    log.warning(
      "No scripts available.\nSee https://velociraptor.run for guidance on how to create scripts.",
    );
    Deno.exit();
  }
  Object.entries(configData.config.scripts)
    .forEach(([id, value]) => {
      if (
        isScriptObject(value) && value.gitHook && !hooks.includes(value.gitHook)
      ) {
        log.warning(
          `Invalid git hook name ${red(value.gitHook)} in script ${blue(id)}`,
        );
        const suggestion = didYouMean(value.gitHook, hooks);
        if (suggestion) {
          console.log(`Did you mean ${red(suggestion)}?`);
        }
      }
    });
  return configData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVfY29uZmlnX2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZV9jb25maWdfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN2QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTdDLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUE2QjtJQUM5RCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxJQUFJLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQ3JEO0lBQ0QsSUFDRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTztRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDckQ7UUFDQSxHQUFHLENBQUMsT0FBTyxDQUNULDRGQUE0RixDQUM3RixDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2I7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ3RDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7UUFDdkIsSUFDRSxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUN4RTtZQUNBLEdBQUcsQ0FBQyxPQUFPLENBQ1QseUJBQXlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ3BFLENBQUM7WUFDRixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLFVBQVU7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqRTtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyJ9
