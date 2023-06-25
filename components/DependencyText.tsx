import { IntentionType } from "@/types/intentionType";
import { getChipColor } from "@/util/DisplayUtil";
import { Chip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

/**
 * A component that displays a dependency as a list item with a prefix and a `Chip` component that displays the name of the dependency and its type.
 *
 * @param dependency - The name and type of the dependency to display.
 * @param showPrefix - Whether to show the prefix for the dependency type (e.g. "achieve" for goals).
 * @returns A JSX element that displays a dependency as a list item with a prefix and a `Chip` component that displays the name of the dependency and its type.
 */
export default function DependencyText({
  dependency: { type, name },
  showPrefix = false,
}: {
  dependency: DependencyNameAndType;
  showPrefix?: boolean;
}) {
  function getPrefix(type: IntentionType) {
    switch (type) {
      case IntentionType.GOAL:
        return "achieve";
      case IntentionType.TASK:
        return "complete";
      case IntentionType.QUALITY:
        return "ensure";
      case IntentionType.RESOURCE:
        return "provide";
    }
  }

  return (
    <li style={{ paddingLeft: 20 }}>
      {showPrefix && getPrefix(type)}{" "}
      <Chip
        size="small"
        key={uuidv4()}
        component="span"
        label={name}
        color={getChipColor(type)}
      />
    </li>
  );
}

type DependencyNameAndType = { type: IntentionType; name: string };
