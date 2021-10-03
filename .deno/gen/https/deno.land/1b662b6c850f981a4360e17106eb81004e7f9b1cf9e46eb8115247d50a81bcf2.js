import { Command } from "../../../deps.ts";
import { ArgsForwardingMode, runScript } from "../../run_script.ts";
import { checkGitHooks } from "../../git_hooks.ts";
import { validateConfigData } from "../../validate_config_data.ts";
import { withUpdateChecks } from "../../update_notifier.ts";
export class RunCommand extends Command {
  configData;
  constructor(configData) {
    super();
    this.configData = configData;
    this.description("Run a script")
      .arguments("<script:scriptid> [additionalArgs...]")
      .useRawArgs()
      .action((options, script, ...additionalArgs) => {
        return withUpdateChecks(async () => {
          if (script === "--help" || script === "-h") {
            console.log(this.getHelp());
            return;
          }
          validateConfigData(this.configData);
          await checkGitHooks(this.configData);
          await runScript({
            configData: this.configData,
            script,
            additionalArgs,
            argsForwardingMode: ArgsForwardingMode.DIRECT,
          });
        });
      });
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE1BQU0sT0FBTyxVQUFXLFNBQVEsT0FBTztJQUNqQjtJQUFwQixZQUFvQixVQUE2QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQURVLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRS9DLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO2FBQzdCLFNBQVMsQ0FBQyx1Q0FBdUMsQ0FBQzthQUNsRCxVQUFVLEVBQUU7YUFDWixNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBYyxFQUFFLEdBQUcsY0FBd0IsRUFBRSxFQUFFO1lBQy9ELE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2pDLElBQUksTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUM1QixPQUFPO2lCQUNSO2dCQUNELGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQXdCLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxTQUFTLENBQUM7b0JBQ2QsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFXO29CQUM1QixNQUFNO29CQUNOLGNBQWM7b0JBQ2Qsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsTUFBTTtpQkFDOUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRiJ9
