import { readJson, writeJson } from "./utilities/json.ts";
import { box } from "./utilities/box.ts";
import { envHOMEDIR } from "./utilities/environment.ts";
import { colors, exists, join, semver } from "../deps.ts";
export const ONE_DAY = 1000 * 60 * 60 * 24;
export class UpdateNotifier {
  name;
  registry;
  currentVersion;
  owner;
  updateCheckInterval;
  lastUpdateCheck = Date.now();
  availableUpdate = undefined;
  constructor(
    {
      name,
      registry,
      currentVersion,
      owner = "_",
      updateCheckInterval = ONE_DAY,
    },
  ) {
    this.name = name;
    this.registry = registry;
    this.currentVersion = currentVersion;
    this.owner = owner;
    this.updateCheckInterval = updateCheckInterval;
  }
  async checkForUpdates(configDir = join(envHOMEDIR(), ".deno/hatcher/")) {
    if (!await exists(configDir)) {
      await Deno.mkdir(configDir, { recursive: true });
    }
    const configPath = join(
      configDir,
      `${this.registry.domain}-${this.name}${
        this.owner ? `-${this.owner}` : ""
      }.json`,
    );
    const configExists = await exists(configPath);
    if (configExists) {
      try {
        const module = await readJson(configPath);
        this.lastUpdateCheck = module.lastUpdateCheck;
      } catch (err) {
        throw new Error(`JSON file contains errors (${configPath}): ${err}`);
      }
    } else {
      await writeJson(configPath, {
        lastUpdateCheck: this.lastUpdateCheck,
      });
    }
    if (this.needsChecking()) {
      let latestVersion;
      try {
        latestVersion = await this.registry.latestVersion(
          this.name,
          this.owner,
        );
      } catch {
        return;
      }
      if (!latestVersion || !semver.valid(latestVersion)) {
        return;
      }
      latestVersion = semver.coerce(latestVersion) || "0.0.0";
      const currentVersion = semver.coerce(this.currentVersion) || "0.0.0";
      if (semver.lt(currentVersion, latestVersion)) {
        const current = (typeof currentVersion === "string"
          ? currentVersion
          : currentVersion.version);
        const latest = (typeof latestVersion === "string"
          ? latestVersion
          : latestVersion.version);
        this.availableUpdate = {
          current,
          latest,
          type: semver.diff(current, latest),
          name: this.name,
          owner: this.owner,
          registry: this.registry.domain,
        };
      }
      this.lastUpdateCheck = Date.now();
      await writeJson(configPath, {
        lastUpdateCheck: this.lastUpdateCheck,
      });
      return this.availableUpdate;
    }
    return;
  }
  needsChecking() {
    return Date.now() - this.lastUpdateCheck > this.updateCheckInterval;
  }
  notify(command, overwrite = false) {
    const update = this.availableUpdate;
    if (update) {
      const header = `Update available ${colors.gray(update.current)} → ${
        colors.green(update.latest)
      }\n`;
      const body = (command
        ? (overwrite
          ? command
          : `Run ${colors.cyan(command)} to update`)
        : `Go to ${
          colors.cyan(this.registry.domain)
        } and check out the updates of ${this.name}!`);
      box(header + body);
    }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQztBQXVCMUQsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUUzQyxNQUFNLE9BQU8sY0FBYztJQUNsQixJQUFJLENBQVM7SUFDYixRQUFRLENBQWtCO0lBQzFCLGNBQWMsQ0FBeUI7SUFDdkMsS0FBSyxDQUFTO0lBQ2QsbUJBQW1CLENBQVM7SUFDNUIsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixlQUFlLEdBQXVCLFNBQVMsQ0FBQztJQUV2RCxZQUNFLEVBQ0UsSUFBSSxFQUNKLFFBQVEsRUFDUixjQUFjLEVBQ2QsS0FBSyxHQUFHLEdBQUcsRUFDWCxtQkFBbUIsR0FBRyxPQUFPLEdBQ3JCO1FBRVYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUNuQixTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLGdCQUFn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
