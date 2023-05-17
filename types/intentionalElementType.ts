import { Typography } from "@mui/material";

export enum IntentionalElementType {
  GOAL = "Goal",
  QUALITY = "Quality",
  TASK = "Task",
  RESSOURCE = "Ressource",
}
export enum ConnectionType {
  AND = "and",
  OR = "or",
}

export function getConnectionTypeDescription(connectionType: ConnectionType) {
  if (connectionType === ConnectionType.AND) return "and";
}
