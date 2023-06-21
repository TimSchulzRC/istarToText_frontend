import { IntentionType } from "@/types/intentionType";
import { getChipColor } from "@/util/DisplayUtil";
import { Chip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

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
    <ul style={{ paddingLeft: 20 }}>
      <li>
        {showPrefix && getPrefix(type)}{" "}
        <Chip
          size="small"
          key={uuidv4()}
          component="span"
          label={name}
          color={getChipColor(type)}
        />
      </li>
    </ul>
  );
}

type DependencyNameAndType = { type: IntentionType; name: string };
