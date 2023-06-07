export enum IntentionType {
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

export function getIntentionTypeDescription(intentionType: IntentionType) {
  if (intentionType === IntentionType.GOAL) return "is a state of affairs that the actor wants to achieve and that has clear-cut criteria of achievement.";
  if (intentionType === IntentionType.TASK) return "represents an action that an actor wants to be executed, usually with the purpose of achieving some goal.";
  if (intentionType === IntentionType.RESOURCE) return "is a physical or informational entity that the actor requires in order to perform a task.";
  if (intentionType === IntentionType.QUALITY) return "is an attribute for which an actor desires some level of achievement.";
}