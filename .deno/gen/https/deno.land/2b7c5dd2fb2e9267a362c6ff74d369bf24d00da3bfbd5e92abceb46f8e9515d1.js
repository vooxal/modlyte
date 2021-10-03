import { log } from "./logger.ts";
import { printScriptsInfo } from "./scripts_info.ts";
import { bold } from "../deps.ts";
import { normalizeScript } from "./normalize_script.ts";
import { resolveShell } from "./resolve_shell.ts";
import { runCommands } from "./run_commands.ts";
import { validateScript } from "./validate_script.ts";
export var ArgsForwardingMode;
(function (ArgsForwardingMode) {
  ArgsForwardingMode[ArgsForwardingMode["DIRECT"] = 0] = "DIRECT";
  ArgsForwardingMode[ArgsForwardingMode["INDIRECT"] = 1] = "INDIRECT";
})(ArgsForwardingMode || (ArgsForwardingMode = {}));
export async function runScript(
  { configData, script, prefix, additionalArgs, argsForwardingMode },
) {
  const { cwd, config } = configData;
  if (script == null || script.length < 1) {
    printScriptsInfo(config);
    Deno.exit();
  }
  validateScript(script, config);
  const scriptDef = config.scripts[script];
  const { scripts, ...rootConfig } = config;
  const commands = normalizeScript(scriptDef, rootConfig);
  const shell = resolveShell();
  try {
    await runCommands({
      shell,
      cwd,
      commands,
      prefix,
      additionalArgs,
      argsForwardingMode,
    });
  } catch (e) {
    log.error(`Failed at the ${bold(script)} script`);
    Deno.exit(3);
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuX3NjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJ1bl9zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxNQUFNLENBQU4sSUFBWSxrQkFHWDtBQUhELFdBQVksa0JBQWtCO0lBQzVCLCtEQUFNLENBQUE7SUFDTixtRUFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUhXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFHN0I7QUFVRCxNQUFNLENBQUMsS0FBSyxVQUFVLFNBQVMsQ0FDN0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQzlDO0lBRWxCLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBQ25DLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN2QyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDYjtJQUNELGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFDO0lBQzFDLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDeEQsTUFBTSxLQUFLLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDN0IsSUFBSTtRQUNGLE1BQU0sV0FBVyxDQUFDO1lBQ2hCLEtBQUs7WUFDTCxHQUFHO1lBQ0gsUUFBUTtZQUNSLE1BQU07WUFDTixjQUFjO1lBQ2Qsa0JBQWtCO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDZDtBQUNILENBQUMifQ==
