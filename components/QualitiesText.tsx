import { IntentionType } from "@/types/intentionType";
import { QualityType, getQualityTypeDescription } from "@/types/qualityType";
import { Chip, Typography } from "@mui/material";
import React from "react";

export default function QualitiesText({
  parentIeType,
  qualityType,
  children,
}: propTypes) {
  return (
    <Typography variant="body1">
      This {parentIeType.toLowerCase()} {getQualityTypeDescription(qualityType)}{" "}
      <Chip label={children} />
    </Typography>
  );
}

type propTypes = {
  parentIeType: IntentionType;
  qualityType: QualityType;
  children: string;
};
