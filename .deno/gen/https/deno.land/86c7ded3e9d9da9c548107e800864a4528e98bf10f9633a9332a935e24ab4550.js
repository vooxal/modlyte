import { DenoLand, UpdateNotifier } from "../deps.ts";
import { UPGRADE_COMMAND, VR_NAME } from "./consts.ts";
import { version } from "./version.ts";
export const notifier = new UpdateNotifier({
  name: VR_NAME,
  registry: DenoLand,
  currentVersion: version,
});
export const withUpdateChecks = async (fn) => {
  const checkForUpdates = notifier.checkForUpdates();
  const ret = fn();
  if (ret instanceof Promise) {
    await ret;
  }
  await checkForUpdates;
  notifier.notify(UPGRADE_COMMAND);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlX25vdGlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlX25vdGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDO0lBQ3pDLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUSxFQUFFLFFBQVE7SUFDbEIsY0FBYyxFQUFFLE9BQU87Q0FDeEIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEVBQWlCLEVBQUUsRUFBRTtJQUMxRCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkQsTUFBTSxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDakIsSUFBSSxHQUFHLFlBQVksT0FBTyxFQUFFO1FBQzFCLE1BQU0sR0FBRyxDQUFDO0tBQ1g7SUFDRCxNQUFNLGVBQWUsQ0FBQztJQUN0QixRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyJ9
