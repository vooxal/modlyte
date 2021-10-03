import { Command } from "../../../deps.ts";
import { exportScripts } from "../../export_scripts.ts";
import { checkGitHooks } from "../../git_hooks.ts";
import { validateConfigData } from "../../validate_config_data.ts";
import { withUpdateChecks } from "../../update_notifier.ts";
export class ExportCommand extends Command {
  configData;
  constructor(configData) {
    super();
    this.configData = configData;
    this.description(
      "Export one or more scripts as standalone executable files",
    )
      .arguments("[scripts...:scriptid]")
      .option(
        "-o, --out-dir [dir:string]",
        "The folder where the scripts will be exported",
      )
      .action((options, scripts) => {
        return withUpdateChecks(async () => {
          validateConfigData(this.configData);
          await checkGitHooks(this.configData);
          await exportScripts(this.configData, scripts, options.outDir);
        });
      });
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE1BQU0sT0FBTyxhQUFjLFNBQVEsT0FBTztJQUNwQjtJQUFwQixZQUFvQixVQUE2QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQURVLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRS9DLElBQUksQ0FBQyxXQUFXLENBQ2QsMkRBQTJELENBQzVEO2FBQ0UsU0FBUyxDQUFDLHVCQUF1QixDQUFDO2FBQ2xDLE1BQU0sQ0FDTCw0QkFBNEIsRUFDNUIsK0NBQStDLENBQ2hEO2FBQ0EsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQWlCLEVBQUUsRUFBRTtZQUNyQyxPQUFPLGdCQUFnQixDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNqQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxVQUF3QixDQUFDLENBQUM7Z0JBQ25ELE1BQU0sYUFBYSxDQUNqQixJQUFJLENBQUMsVUFBd0IsRUFDN0IsT0FBTyxFQUNQLE9BQU8sQ0FBQyxNQUFNLENBQ2YsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YifQ==
