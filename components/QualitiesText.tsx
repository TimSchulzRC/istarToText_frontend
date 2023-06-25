import { IntentionType } from "@/types/intentionType";
import { QualityType, getQualityTypeDescription } from "@/types/qualityType";
import { Chip, Typography } from "@mui/material";

/**
 * A component that displays a phrase summarizing the qualities of a specified intentional element, including the type of the qualities and the name of the element.
 *
 * @param parentIeType - The type of the intentional element whose qualities to summarize.
 * @param qualityType - The type of the qualities to summarize.
 * @param children - The name of the element whose qualities to summarize.
 * @returns A JSX element that displays a phrase summarizing the qualities of a specified intentional element, including the type of the qualities and the name of the element.
 */
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
