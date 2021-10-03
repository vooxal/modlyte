import { Command, DenoLand, semver } from "../../../deps.ts";
import { log } from "../../logger.ts";
import { version as currentVersion } from "../../version.ts";
import { VR_NAME } from "../../consts.ts";
import { spawn } from "../../util.ts";
export class UpgradeCommand extends Command {
  constructor() {
    super();
    this.description(
      "Upgrade Velociraptor to the latest version or to a specific one",
    )
      .arguments("[version:string]")
      .action(async (options, version) => {
        let newVersion = version;
        if (!newVersion) {
          newVersion = await DenoLand.latestVersion(VR_NAME);
        }
        if (!newVersion) {
          log.error("Cannot retrieve the latest version tag");
          return;
        }
        if (semver.eq(newVersion, currentVersion)) {
          log.info("Velociraptor is already up-to-date");
          return;
        }
        try {
          await spawn([
            "deno",
            "install",
            "--reload",
            "-qAfn",
            "vr",
            `https://deno.land/x/${VR_NAME}@${newVersion}/cli.ts`,
          ]);
          log.info(`✅ Successfully upgraded to ${newVersion}`);
        } catch (e) {
          console.log(e.message);
        }
      });
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVwZ3JhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxPQUFPLElBQUksY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEMsTUFBTSxPQUFPLGNBQWUsU0FBUSxPQUFPO0lBQ3pDO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsV0FBVyxDQUNkLGlFQUFpRSxDQUNsRTthQUNFLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQzthQUM3QixNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUEyQixFQUFFLEVBQUU7WUFDckQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsVUFBVSxHQUFHLE1BQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwRDtZQUNELElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPO2FBQ1I7WUFDRCxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxFQUFFO2dCQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7Z0JBQy9DLE9BQU87YUFDUjtZQUNELElBQUk7Z0JBQ0YsTUFBTSxLQUFLLENBQUM7b0JBQ1YsTUFBTTtvQkFDTixTQUFTO29CQUNULFVBQVU7b0JBQ1YsT0FBTztvQkFDUCxJQUFJO29CQUNKLHVCQUF1QixPQUFPLElBQUksVUFBVSxTQUFTO2lCQUN0RCxDQUFDLENBQUM7Z0JBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsVUFBVSxFQUFFLENBQUMsQ0FBQzthQUN0RDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YifQ==
