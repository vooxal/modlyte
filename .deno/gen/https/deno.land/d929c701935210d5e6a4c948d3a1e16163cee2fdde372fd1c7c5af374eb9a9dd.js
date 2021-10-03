import { Command, CompletionsCommand } from "../../../deps.ts";
import { version } from "../../version.ts";
import { ScriptIdType } from "../types/script_id_type.ts";
import { RunCommand } from "./run.ts";
import { ExportCommand } from "./export.ts";
import { ArgsForwardingMode, runScript } from "../../run_script.ts";
import { RunHookCommand } from "./run_hook.ts";
import { VR_HOOKS, VR_LOG, VR_SHELL } from "../../consts.ts";
import { checkGitHooks } from "../../git_hooks.ts";
import { validateConfigData } from "../../validate_config_data.ts";
import { UpgradeCommand } from "./upgrade.ts";
import { withUpdateChecks } from "../../update_notifier.ts";
export class VrCommand extends Command {
  configData;
  constructor(configData) {
    super();
    this.configData = configData;
    this.name("vr")
      .version(version)
      .description(
        "🦖 Velociraptor\nThe npm-style script runner for Deno\n\nDocs: https://velociraptor.run",
      )
      .env(
        `${VR_SHELL}=<value:string>`,
        "The path to a shell executable to be used for executing scripts",
      )
      .env(
        `${VR_LOG}=<value:string>`,
        "Log verbosity. One of: DEBUG, INFO, WARNING, ERROR, CRITICAL",
      )
      .env(
        `${VR_HOOKS}=<value:boolean>`,
        "If 'false', prevents velociraptor from installing and running git hooks (ie for CI)",
      )
      .type("scriptid", new ScriptIdType(this.configData), { global: true })
      .arguments("[script:scriptid] [additionalArgs...]")
      .stopEarly()
      .action((options, script, additionalArgs) => {
        return withUpdateChecks(async () => {
          validateConfigData(this.configData);
          await checkGitHooks(this.configData);
          await runScript({
            configData: this.configData,
            script,
            additionalArgs,
            argsForwardingMode: ArgsForwardingMode.DIRECT,
          });
        });
      })
      .command("run", new RunCommand(this.configData))
      .command("run-hook", new RunHookCommand(this.configData))
      .command("export", new ExportCommand(this.configData))
      .command("upgrade", new UpgradeCommand())
      .command("completions", new CompletionsCommand().hidden())
      .reset();
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQsTUFBTSxPQUFPLFNBQVUsU0FBUSxPQUFPO0lBQ2hCO0lBQXBCLFlBQW9CLFVBQTZCO1FBQy9DLEtBQUssRUFBRSxDQUFDO1FBRFUsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFFL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDWixPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ2hCLFdBQVcsQ0FDVix5RkFBeUYsQ0FDMUY7YUFDQSxHQUFHLENBQ0YsR0FBRyxRQUFRLGlCQUFpQixFQUM1QixpRUFBaUUsQ0FDbEU7YUFDQSxHQUFHLENBQ0YsR0FBRyxNQUFNLGlCQUFpQixFQUMxQiw4REFBOEQsQ0FDL0Q7YUFDQSxHQUFHLENBQ0YsR0FBRyxRQUFRLGtCQUFrQixFQUM3QixxRkFBcUYsQ0FDdEY7YUFDQSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUNyRSxTQUFTLENBQUMsdUNBQXVDLENBQUM7YUFDbEQsU0FBUyxFQUFFO2FBQ1gsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQWMsRUFBRSxjQUF3QixFQUFFLEVBQUU7WUFDNUQsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDakMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBd0IsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLFNBQVMsQ0FBQztvQkFDZCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVc7b0JBQzVCLE1BQU07b0JBQ04sY0FBYztvQkFDZCxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNO2lCQUM5QyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQy9DLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hELE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JELE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxjQUFjLEVBQUUsQ0FBQzthQUN4QyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN6RCxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7Q0FDRiJ9
