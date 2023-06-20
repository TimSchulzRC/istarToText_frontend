import { IntentionType } from "@/types/intentionType";

export function getChipColor(type: IntentionType) {
    switch (type) {
      case IntentionType.GOAL:
        return "warning";
      case IntentionType.TASK:
        return "secondary";
      case IntentionType.QUALITY:
        return "success";
      case IntentionType.RESOURCE:
        return "default";
    }
  }