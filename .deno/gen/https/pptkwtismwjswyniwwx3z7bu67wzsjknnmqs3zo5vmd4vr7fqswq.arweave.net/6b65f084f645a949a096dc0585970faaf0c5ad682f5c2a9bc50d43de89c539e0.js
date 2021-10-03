import { HatcherError } from "./utilities/error.ts";
import { DenoLand } from "./registries/DenoLand.ts";
import { Denopkg } from "./registries/Denopkg.ts";
import { Github } from "./registries/Github.ts";
import { Jspm } from "./registries/Jspm.ts";
import { NestLand } from "./registries/NestLand.ts";
import { Skypack } from "./registries/Skypack.ts";
export const registries = [
  DenoLand,
  Denopkg,
  Github,
  Jspm,
  NestLand,
  Skypack,
];
export function getRegistry(registryName) {
  for (const registry of registries) {
    if (registryName === registry.domain) {
      return registry;
    }
  }
  throw new HatcherError(`Unsupported registry: ${registryName}`);
}
export function latestVersion(registryName, module, owner = "_") {
  for (const registry of registries) {
    if (registryName === registry.domain) {
      return registry.latestVersion(module, owner);
    }
  }
  throw new HatcherError(`Unsupported registry: ${registryName}`);
}
export function latestStableVersion(registryName, module, owner = "_") {
  for (const registry of registries) {
    if (registryName === registry.domain) {
      return registry.latestStableVersion(module, owner);
    }
  }
  throw new HatcherError(`Unsupported registry: ${registryName}`);
}
export function sortedVersions(registryName, module, owner = "_") {
  for (const registry of registries) {
    if (registryName === registry.domain) {
      return registry.sortedVersions(module, owner);
    }
  }
  throw new HatcherError(`Unsupported registry: ${registryName}`);
}
export function parseURL(url) {
  const registryName = url.split("/")[2];
  for (const registry of registries) {
    if (registryName === registry.domain) {
      return {
        registry: registryName,
        ...registry.parseURL(url),
      };
    }
  }
  throw new HatcherError(`Unsupported registry: ${registryName}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBUWxELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBc0I7SUFDM0MsUUFBUTtJQUNSLE9BQU87SUFDUCxNQUFNO0lBQ04sSUFBSTtJQUNKLFFBQVE7SUFDUixPQUFPO0NBQ1IsQ0FBQztBQUdGLE1BQU0sVUFBVSxXQUFXLENBQUMsWUFBb0I7SUFDOUMsS0FBSyxNQUFNLFFBQVEsSUFBSSxVQUFVLEVBQUU7UUFDakMsSUFBSSxZQUFZLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtLQUNGO0lBQ0QsTUFBTSxJQUFJLFlBQVksQ0FBQyx5QkFBeUIsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBR0QsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsWUFBb0IsRUFDcEIsTUFBYyxFQUNkLEtBQUssR0FBRyxHQUFHO0lBRVgsS0FBSyxNQUFNLFFBQVEsSUFBSSxVQUFVLEVBQUU7UUFDakMsSUFBSSxZQUFZLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlDO0tBQ0Y7SUFDRCxNQUFNLElBQUksWUFBWSxDQUFDLHlCQUF5QixZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFHRCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFlBQW9CLEVBQ3BCLE1BQWMsRUFDZCxLQUFLLEdBQUcsR0FBRztJQUVYLEtBQUssTUFBTSxRQUFRLElBQUksVUFBVSxFQUFFO1FBQ2pDLElBQUksWUFBWSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsT0FBTyxRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BEO0tBQ0Y7SUFDRCxNQUFNLElBQUksWUFBWSxDQUFDLHlCQUF5QixZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFHRCxNQUFNLFVBQVUsY0FBYyxDQUM1QixZQUFvQixFQUNwQixNQUFjLEVBQ2QsS0FBSyxHQUFHLEdBQUc7SUFFWCxLQUFLLE1BQU0sUUFBUSxJQUFJLFVBQVUsRUFBRTtRQUNqQyxJQUFJLFlBQVksS0FBSyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3BDLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0M7S0FDRjtJQUNELE1BQU0sSUFBSSxZQUFZLENBQUMseUJBQXlCLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUdELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBVztJQUNsQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZDLEtBQUssTUFBTSxRQUFRLElBQUksVUFBVSxFQUFFO1FBQ2pDLElBQUksWUFBWSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsT0FBTztnQkFDTCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUMxQixDQUFDO1NBQ0g7S0FDRjtJQUNELE1BQU0sSUFBSSxZQUFZLENBQUMseUJBQXlCLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDbEUsQ0FBQyJ9
