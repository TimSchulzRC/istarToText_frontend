export enum IntentionalElementType {
  GOAL = "Goal",
  TASK = "Task",
  RESOURCE = "Resource",
  QUALITY = "Quality",
}
export enum ConnectionType {
  AND = "and",
  OR = "or",
}

export function getConnectionTypeDescription(connectionType: ConnectionType) {
  if (connectionType === ConnectionType.AND) return "and";
}
