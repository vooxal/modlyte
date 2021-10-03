import { YAMLError } from "./error.ts";
function compileList(schema, name, result) {
  const exclude = [];
  for (const includedSchema of schema.include) {
    result = compileList(includedSchema, name, result);
  }
  for (const currentType of schema[name]) {
    for (
      let previousIndex = 0; previousIndex < result.length; previousIndex++
    ) {
      const previousType = result[previousIndex];
      if (
        previousType.tag === currentType.tag &&
        previousType.kind === currentType.kind
      ) {
        exclude.push(previousIndex);
      }
    }
    result.push(currentType);
  }
  return result.filter((_type, index) => !exclude.includes(index));
}
function compileMap(...typesList) {
  const result = {
    fallback: {},
    mapping: {},
    scalar: {},
    sequence: {},
  };
  for (const types of typesList) {
    for (const type of types) {
      if (type.kind !== null) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
    }
  }
  return result;
}
export class Schema {
  static SCHEMA_DEFAULT;
  implicit;
  explicit;
  include;
  compiledImplicit;
  compiledExplicit;
  compiledTypeMap;
  constructor(definition) {
    this.explicit = definition.explicit || [];
    this.implicit = definition.implicit || [];
    this.include = definition.include || [];
    for (const type of this.implicit) {
      if (type.loadKind && type.loadKind !== "scalar") {
        throw new YAMLError(
          "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.",
        );
      }
    }
    this.compiledImplicit = compileList(this, "implicit", []);
    this.compiledExplicit = compileList(this, "explicit", []);
    this.compiledTypeMap = compileMap(
      this.compiledImplicit,
      this.compiledExplicit,
    );
  }
  extend(definition) {
    return new Schema({
      implicit: [
        ...new Set([...this.implicit, ...(definition?.implicit ?? [])]),
      ],
      explicit: [
        ...new Set([...this.explicit, ...(definition?.explicit ?? [])]),
      ],
      include: [...new Set([...this.include, ...(definition?.include ?? [])])],
    });
  }
  static create() {}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFJdkMsU0FBUyxXQUFXLENBQ2xCLE1BQWMsRUFDZCxJQUE2QixFQUM3QixNQUFjO0lBRWQsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTdCLEtBQUssTUFBTSxjQUFjLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUMzQyxNQUFNLEdBQUcsV0FBVyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDcEQ7SUFFRCxLQUFLLE1BQU0sV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QyxLQUNFLElBQUksYUFBYSxHQUFHLENBQUMsRUFDckIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQzdCLGFBQWEsRUFBRSxFQUNmO1lBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNDLElBQ0UsWUFBWSxDQUFDLEdBQUcsS0FBSyxXQUFXLENBQUMsR0FBRztnQkFDcEMsWUFBWSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxFQUN0QztnQkFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzFCO0lBRUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBVyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUdELFNBQVMsVUFBVSxDQUFDLEdBQUcsU0FBbUI7SUFDeEMsTUFBTSxNQUFNLEdBQVk7UUFDdEIsUUFBUSxFQUFFLEVBQUU7UUFDWixPQUFP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
