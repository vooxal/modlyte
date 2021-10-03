import { StringType } from "../../../deps.ts";
export class ScriptIdType extends StringType {
  configData;
  constructor(configData) {
    super();
    this.configData = configData;
  }
  complete() {
    if (!this.configData || !this.configData.config?.scripts) {
      return [];
    }
    return Object.keys(this.configData.config.scripts);
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0X2lkX3R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY3JpcHRfaWRfdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHOUMsTUFBTSxPQUFPLFlBQWEsU0FBUSxVQUFVO0lBQ3RCO0lBQXBCLFlBQW9CLFVBQTZCO1FBQy9DLEtBQUssRUFBRSxDQUFDO1FBRFUsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7SUFFakQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU87WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNwRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGIn0=
