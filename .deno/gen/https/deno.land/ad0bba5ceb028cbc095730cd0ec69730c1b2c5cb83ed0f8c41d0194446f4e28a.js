import { escape } from "./util.ts";
var DenoOptions;
(function (DenoOptions) {
  DenoOptions["allow"] = "allow";
  DenoOptions["cachedOnly"] = "cachedOnly";
  DenoOptions["cert"] = "cert";
  DenoOptions["imap"] = "imap";
  DenoOptions["inspect"] = "inspect";
  DenoOptions["inspectBrk"] = "inspectBrk";
  DenoOptions["lock"] = "lock";
  DenoOptions["log"] = "log";
  DenoOptions["noCheck"] = "noCheck";
  DenoOptions["noRemote"] = "noRemote";
  DenoOptions["quiet"] = "quiet";
  DenoOptions["reload"] = "reload";
  DenoOptions["tsconfig"] = "tsconfig";
  DenoOptions["unstable"] = "unstable";
  DenoOptions["v8Flags"] = "v8Flags";
  DenoOptions["watch"] = "watch";
  DenoOptions["shuffle"] = "shuffle";
})(DenoOptions || (DenoOptions = {}));
const denoCmdOptions = {
  bundle: [
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.lock,
    DenoOptions.log,
    DenoOptions.noCheck,
    DenoOptions.noRemote,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.tsconfig,
    DenoOptions.unstable,
  ],
  install: [
    DenoOptions.allow,
    DenoOptions.cachedOnly,
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.inspect,
    DenoOptions.inspectBrk,
    DenoOptions.lock,
    DenoOptions.log,
    DenoOptions.noCheck,
    DenoOptions.noRemote,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.tsconfig,
    DenoOptions.unstable,
    DenoOptions.v8Flags,
  ],
  run: [
    DenoOptions.allow,
    DenoOptions.cachedOnly,
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.inspect,
    DenoOptions.inspectBrk,
    DenoOptions.lock,
    DenoOptions.log,
    DenoOptions.noCheck,
    DenoOptions.noRemote,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.tsconfig,
    DenoOptions.unstable,
    DenoOptions.v8Flags,
    DenoOptions.watch,
  ],
  test: [
    DenoOptions.allow,
    DenoOptions.cachedOnly,
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.inspect,
    DenoOptions.inspectBrk,
    DenoOptions.lock,
    DenoOptions.log,
    DenoOptions.noCheck,
    DenoOptions.noRemote,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.tsconfig,
    DenoOptions.unstable,
    DenoOptions.v8Flags,
    DenoOptions.shuffle,
  ],
  cache: [
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.lock,
    DenoOptions.log,
    DenoOptions.noCheck,
    DenoOptions.noRemote,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.tsconfig,
    DenoOptions.unstable,
  ],
  doc: [
    DenoOptions.imap,
    DenoOptions.log,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.unstable,
  ],
  eval: [
    DenoOptions.cachedOnly,
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.inspect,
    DenoOptions.inspectBrk,
    DenoOptions.lock,
    DenoOptions.log,
    DenoOptions.noCheck,
    DenoOptions.noRemote,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.tsconfig,
    DenoOptions.unstable,
    DenoOptions.v8Flags,
  ],
  repl: [
    DenoOptions.cachedOnly,
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.inspect,
    DenoOptions.inspectBrk,
    DenoOptions.lock,
    DenoOptions.log,
    DenoOptions.noCheck,
    DenoOptions.noRemote,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.tsconfig,
    DenoOptions.unstable,
    DenoOptions.v8Flags,
  ],
  fmt: [
    DenoOptions.log,
    DenoOptions.quiet,
    DenoOptions.unstable,
  ],
  lint: [
    DenoOptions.log,
    DenoOptions.quiet,
    DenoOptions.unstable,
  ],
  types: [
    DenoOptions.log,
    DenoOptions.quiet,
    DenoOptions.unstable,
  ],
  info: [
    DenoOptions.cert,
    DenoOptions.imap,
    DenoOptions.log,
    DenoOptions.quiet,
    DenoOptions.reload,
    DenoOptions.unstable,
  ],
};
const denoOption = {
  ...DenoOptions,
  [DenoOptions.allow]: "allow-",
  [DenoOptions.imap]: "importmap",
  [DenoOptions.inspectBrk]: "inspect-brk",
  [DenoOptions.log]: "log-level",
  [DenoOptions.tsconfig]: "config",
  [DenoOptions.v8Flags]: "v8-flags",
  [DenoOptions.noCheck]: "no-check",
  [DenoOptions.noRemote]: "no-remote",
  [DenoOptions.cachedOnly]: "cached-only",
};
export function buildCommandString(command) {
  let cmd = command.cmd.concat(), match;
  if (match = matchCompactRun(cmd)) {
    cmd = "deno run " + cmd;
  }
  if (match = matchDenoCommand(cmd)) {
    const subCommand = match[1];
    if (subCommand && subCommand in denoCmdOptions) {
      const insertAt = match[0].length;
      const options = denoCmdOptions[subCommand];
      for (let optionName of options) {
        const option = command[optionName];
        if (option) {
          switch (optionName) {
            case DenoOptions.allow: {
              const flags = generateFlagOptions(option, denoOption[optionName]);
              if (flags && flags.length > 0) {
                cmd = insertOptions(cmd, insertAt, ...flags);
              }
              break;
            }
            case DenoOptions.v8Flags: {
              const flags = generateFlagOptions(option);
              if (flags && flags.length > 0) {
                cmd = insertOptions(
                  cmd,
                  insertAt,
                  `--${denoOption[optionName]}=${flags.join(",")}`,
                );
              }
              break;
            }
            case DenoOptions.cachedOnly:
            case DenoOptions.noCheck:
            case DenoOptions.noRemote:
            case DenoOptions.quiet:
            case DenoOptions.unstable:
            case DenoOptions.watch: {
              if (option === true) {
                cmd = insertOptions(
                  cmd,
                  insertAt,
                  `--${denoOption[optionName]}`,
                );
              }
              break;
            }
            case DenoOptions.reload: {
              if (option === true) {
                cmd = insertOptions(
                  cmd,
                  insertAt,
                  `--${denoOption[optionName]}`,
                );
              } else if (typeof option === "string") {
                cmd = insertOptions(
                  cmd,
                  insertAt,
                  `--${denoOption[optionName]}=${escapeCliOption(option)}`,
                );
              } else if (Array.isArray(option)) {
                cmd = insertOptions(
                  cmd,
                  insertAt,
                  `--${denoOption[optionName]}=${
                    option.map(escapeCliOption).join(",")
                  }`,
                );
              }
              break;
            }
            default:
              cmd = insertOptions(
                cmd,
                insertAt,
                `--${denoOption[optionName]}=${escapeCliOption(option)}`,
              );
          }
        }
      }
    }
  }
  return cmd;
}
function insertOptions(command, atPosition, ...options) {
  return command.slice(0, atPosition) + " " + options.join(" ") +
    command.slice(atPosition);
}
function generateFlagOptions(flags, prefix = "") {
  return Object.entries(flags).map(([k, v]) =>
    `--${prefix}${k}${v !== true ? `="${escapeCliOption(v.toString())}"` : ""}`
  );
}
function matchDenoCommand(command) {
  return command.match(/^deno +(\w+)/);
}
function matchCompactRun(command) {
  return command.match(
    /^'(?:\\'|.)*?\.[tj]s'|^"(?:\\"|.)*?\.[tj]s"|^(?:\\\ |\S)+\.[tj]s/,
  );
}
function escapeCliOption(option) {
  return escape(option, '"', " ");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfY29tbWFuZF9zdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZF9jb21tYW5kX3N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLElBQUssV0FrQko7QUFsQkQsV0FBSyxXQUFXO0lBQ2QsOEJBQWUsQ0FBQTtJQUNmLHdDQUF5QixDQUFBO0lBQ3pCLDRCQUFhLENBQUE7SUFDYiw0QkFBYSxDQUFBO0lBQ2Isa0NBQW1CLENBQUE7SUFDbkIsd0NBQXlCLENBQUE7SUFDekIsNEJBQWEsQ0FBQTtJQUNiLDBCQUFXLENBQUE7SUFDWCxrQ0FBbUIsQ0FBQTtJQUNuQixvQ0FBcUIsQ0FBQTtJQUNyQiw4QkFBZSxDQUFBO0lBQ2YsZ0NBQWlCLENBQUE7SUFDakIsb0NBQXFCLENBQUE7SUFDckIsb0NBQXFCLENBQUE7SUFDckIsa0NBQW1CLENBQUE7SUFDbkIsOEJBQWUsQ0FBQTtJQUNmLGtDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFsQkksV0FBVyxLQUFYLFdBQVcsUUFrQmY7QUFFRCxNQUFNLGNBQWMsR0FBcUM7SUFDdkQsTUFBTSxFQUFFO1FBQ04sV0FBVyxDQUFDLElBQUk7UUFDaEIsV0FBVyxDQUFDLElBQUk7UUFDaEIsV0FBVyxDQUFDLElBQUk7UUFDaEIsV0FBVyxDQUFDLEdBQUc7UUFDZixXQUFXLENBQUMsT0FBTztRQUNuQixXQUFXLENBQUMsUUFBUTtRQUNwQixXQUFXLENBQUMsS0FBSztRQUNqQixXQUFXLENBQUMsTUFBTTtRQUNsQixXQUFXLENBQUMsUUFBUTtRQUNwQixXQUFXLENBQUMsUUFBUTtLQUNyQjtJQUNELE9BQU8sRUFBRTtRQUNQLFdBQVcsQ0FBQyxLQUFLO1FBQ2pCLFdBQVcsQ0FBQyxVQUFVO1FBQ3RCLFdBQVcsQ0FBQyxJQUFJO1FBQ2hCLFdBQVcsQ0FBQyxJQUFJO1FBQ2hCLFdBQVcsQ0FBQyxPQUFPO1FBQ25C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
