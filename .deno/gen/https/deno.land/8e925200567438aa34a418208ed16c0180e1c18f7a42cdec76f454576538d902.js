import { log } from "./logger.ts";
import { blue, bold } from "../deps.ts";
import { didYouMean } from "./did_you_mean.ts";
export function validateScript(script, config) {
  if (!(script in config.scripts)) {
    log.error(`Script ${blue(script)} not found`);
    const suggestion = didYouMean(script, Object.keys(config.scripts));
    if (suggestion) {
      console.log(`Did you mean ${blue(suggestion)}?`);
    } else {
      console.log(
        `Run ${
          bold("vr")
        } without arguments to see a list of available scripts.`,
      );
    }
    Deno.exit();
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVfc2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdGVfc2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9DLE1BQU0sVUFBVSxjQUFjLENBQUMsTUFBYyxFQUFFLE1BQTRCO0lBQ3pFLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDL0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksVUFBVTtZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUQ7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUNULE9BQ0UsSUFBSSxDQUFDLElBQUksQ0FDWCx3REFBd0QsQ0FDekQsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2I7QUFDSCxDQUFDIn0=
