import { Command } from "../../../deps.ts";
import { ArgsForwardingMode, runScript } from "../../run_script.ts";
import { VR_HOOKS } from "../../consts.ts";
import { validateConfigData } from "../../validate_config_data.ts";
import { isScriptObject } from "../../util.ts";
export class RunHookCommand extends Command {
  configData;
  constructor(configData) {
    super();
    this.configData = configData;
    this.description("Run a git hook")
      .hidden()
      .arguments("<hook:string> [args...]")
      .useRawArgs()
      .action(async (_, hook, ...args) => {
        validateConfigData(this.configData);
        if (Deno.env.get(VR_HOOKS) !== "false" && this.configData) {
          const script = Object.entries(this.configData.config.scripts)
            .find(([_, value]) =>
              isScriptObject(value) &&
              value.gitHook === hook
            );
          if (script) {
            await runScript({
              configData: this.configData,
              script: script[0],
              prefix: `GIT_ARGS=("$@");`,
              additionalArgs: args,
              argsForwardingMode: ArgsForwardingMode.INDIRECT,
            });
          }
        }
      });
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuX2hvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydW5faG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE1BQU0sT0FBTyxjQUFlLFNBQVEsT0FBTztJQUNyQjtJQUFwQixZQUFvQixVQUE2QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQURVLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRS9DLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7YUFDL0IsTUFBTSxFQUFFO2FBQ1IsU0FBUyxDQUFDLHlCQUF5QixDQUFDO2FBQ3BDLFVBQVUsRUFBRTthQUNaLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQVksRUFBRSxHQUFHLElBQWMsRUFBRSxFQUFFO1lBQ25ELGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUN6RCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztxQkFDMUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUNuQixjQUFjLENBQUMsS0FBSyxDQUFDO29CQUNyQixLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksQ0FDdkIsQ0FBQztnQkFDSixJQUFJLE1BQU0sRUFBRTtvQkFDVixNQUFNLFNBQVMsQ0FBQzt3QkFDZCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVc7d0JBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixNQUFNLEVBQUUsa0JBQWtCO3dCQUMxQixjQUFjLEVBQUUsSUFBSTt3QkFDcEIsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsUUFBUTtxQkFDaEQsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRiJ9
