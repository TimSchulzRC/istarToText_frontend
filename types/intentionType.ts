/**
 * An enumeration representing the type of an intentional element in the system.
 *
 * @enum {string}
 */
export enum IntentionType {
  GOAL = "goal",
  TASK = "task",
  RESOURCE = "resource",
  QUALITY = "quality",
}
/**
 * An enumeration representing the type of connection between two intentional elements in the system.
 *
 * @enum {string}
 */
export enum ConnectionType {
  AND = "and",
  OR = "or",
}

/**
 * A function that returns a description of the specified connection type.
 *
 * @param connectionType - The type of the connection.
 * @returns A string describing the specified connection type.
 */
export function getConnectionTypeDescription(connectionType: ConnectionType) {
  if (connectionType === ConnectionType.AND) return "and";
}

/**
 * A function that returns a description of the specified intention type.
 *
 * @param intentionType - The type of the intentional element.
 * @returns A string describing the specified intention type.
 */
export function getIntentionTypeDescription(intentionType: IntentionType) {
  if (intentionType === IntentionType.GOAL)
    return "is a state of affairs that the actor wants to achieve and that has clear-cut criteria of achievement.";
  if (intentionType === IntentionType.TASK)
    return "represents an action that an actor wants to be executed, usually with the purpose of achieving some goal.";
  if (intentionType === IntentionType.RESOURCE)
    return "is a physical or informational entity that the actor requires in order to perform a task.";
  if (intentionType === IntentionType.QUALITY)
    return "is an attribute for which an actor desires some level of achievement.";
}
