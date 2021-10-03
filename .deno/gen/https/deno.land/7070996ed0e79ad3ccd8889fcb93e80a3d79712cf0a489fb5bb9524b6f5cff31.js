import { loadConfig } from "./src/load_config.ts";
import { VrCommand } from "./src/cli/commands/vr.ts";
if (import.meta.main) {
  const config = await loadConfig();
  new VrCommand(config).parse(Deno.args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFckQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtJQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO0lBQ2xDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDeEMifQ==
