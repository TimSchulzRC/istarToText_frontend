import { IntentionType } from "@/types/intentionType";

/**
 * A function that returns the color of a chip based on the specified intention type.
 *
 * @param type - The intention type.
 * @returns The color of the chip.
 */
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
