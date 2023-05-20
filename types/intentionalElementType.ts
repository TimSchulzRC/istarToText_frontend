export enum IntentionalElementType {
  GOAL = "Goal",
  TASK = "Task",
}
export enum ConnectionType {
  AND = "and",
  OR = "or",
}

export function getConnectionTypeDescription(connectionType: ConnectionType) {
  if (connectionType === ConnectionType.AND) return "and";
}
