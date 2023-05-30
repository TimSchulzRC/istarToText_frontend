export enum IntentionalElementType {
  GOAL = "goal",
  TASK = "task",
  RESOURCE = "resource",
  QUALITY = "quality",
}
export enum ConnectionType {
  AND = "and",
  OR = "or",
}

export function getConnectionTypeDescription(connectionType: ConnectionType) {
  if (connectionType === ConnectionType.AND) return "and";
}
