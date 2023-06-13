import Dependency from "@/types/Dependency";
import { IntentionType } from "@/types/intentionType";
import { getChipColor } from "@/util/DisplayUtil";
import { Chip } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function DependencyText({
  dependency: { type, name },
}: {
  dependency: DependencyNameAndType;
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
    <>
      {" "}
      {getPrefix(type)}{" "}
      <Chip
        size="small"
        key={uuidv4()}
        component="span"
        label={name}
        color={getChipColor(type)}
      />
    </>
  );
}

type DependencyNameAndType = { type: IntentionType; name: string };
