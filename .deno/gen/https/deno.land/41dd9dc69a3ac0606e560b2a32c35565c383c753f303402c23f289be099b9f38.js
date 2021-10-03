import { blue, existsSync, path } from "../deps.ts";
import { isScriptObject, makeFileExecutable, spawn } from "./util.ts";
import { version } from "./version.ts";
import { VR_HOOKS, VR_MARK } from "./consts.ts";
export const hooks = [
  "applypatch-msg",
  "pre-applypatch",
  "post-applypatch",
  "pre-commit",
  "pre-merge-commit",
  "prepare-commit-msg",
  "commit-msg",
  "post-commit",
  "pre-rebase",
  "post-checkout",
  "post-merge",
  "pre-push",
  "post-update",
  "push-to-checkout",
  "pre-auto-gc",
  "post-rewrite",
  "sendemail-validate",
];
function hookScript(hook) {
  return `#!/bin/sh
# ${VR_MARK} ${version}
vr run-hook ${hook} "$@"
`;
}
function areGitHooksInstalled(gitDir) {
  return existsSync(path.join(gitDir, "hooks", ".velociraptor"));
}
function installGitHooks(gitDir) {
  const hooksDir = path.join(gitDir, "hooks");
  hooks.forEach((hook) => {
    const hookFile = path.join(hooksDir, hook);
    if (existsSync(hookFile)) {
      Deno.renameSync(hookFile, `${hookFile}.bkp`);
    }
    Deno.writeTextFileSync(hookFile, hookScript(hook));
    makeFileExecutable(hookFile);
  });
  Deno.writeTextFileSync(path.join(hooksDir, ".velociraptor"), "");
  console.log(`
  ✅ ${blue("Git hooks successfully installed")}
  `);
}
export async function checkGitHooks(configData) {
  if (Deno.env.get(VR_HOOKS) === "false") {
    return;
  }
  try {
    const gitDir = await spawn(
      ["git", "rev-parse", "--git-common-dir"],
      configData.cwd,
    );
    const absGitDir = path.join(configData.cwd, gitDir.trim());
    if (
      !areGitHooksInstalled(absGitDir) &&
      Object.values(configData.config.scripts)
        .filter(isScriptObject)
        .some((s) => {
          return "gitHook" in s && hooks.includes(s.gitHook);
        })
    ) {
      installGitHooks(absGitDir);
    }
  } catch (e) {
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0X2hvb2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2l0X2hvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR2hELE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRztJQUNuQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLG9CQUFvQjtJQUNwQixZQUFZO0lBQ1osYUFBYTtJQUNiLFlBQVk7SUFDWixlQUFlO0lBQ2YsWUFBWTtJQUNaLFVBQVU7SUFDVixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixjQUFjO0lBQ2Qsb0JBQW9CO0NBQ3JCLENBQUM7QUFFRixTQUFTLFVBQVUsQ0FBQyxJQUFZO0lBQzlCLE9BQU87SUFDTCxPQUFPLElBQUksT0FBTztjQUNSLElBQUk7Q0FDakIsQ0FBQztBQUNGLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLE1BQWM7SUFDMUMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLE1BQWM7SUFDckMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsUUFBUSxNQUFNLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkQsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQztNQUNSLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQztHQUMzQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUMsVUFBc0I7SUFDeEQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxPQUFPO1FBQUUsT0FBTztJQUMvQyxJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQ3hCLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxVQUFVLENBQUMsR0FBRyxDQUNmLENBQUM7UUFDRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFDRSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2lCQUNyQyxNQUFNLENBQUMsY0FBYyxDQUFDO2lCQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDZixPQUFPLFNBQVMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLEVBQ0o7WUFDQSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUI7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO0tBRVg7QUFDSCxDQUFDIn0=
