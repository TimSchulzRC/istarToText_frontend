import Intention from "@/types/Intention";
import Quality, { QualityDirection } from "@/types/Quality";
import { QualityType, getQualityTypeDescription } from "@/types/qualityType";
import { getChipColor } from "@/util/DisplayUtil";
import { elementIsNotFirstOrLast } from "@/util/ElementListUtil";
import { v4 as uuidv4 } from "uuid";
import LinkHoverChip from "./LinkHoverChip";

/**
 * A component that displays a phrase summarizing the qualities of a specified intentional element, including the type and direction of the qualities.
 *
 * @param selectedIntention - The intentional element whose qualities to summarize.
 * @param qualities - The list of qualities to summarize.
 * @param qualityType - The type of the qualities to summarize.
 * @param qualityDirection - The direction of the qualities to summarize.
 * @returns A JSX element that displays a phrase summarizing the qualities of a specified intentional element, including the type and direction of the qualities.
 */
export default function QualitiesPhrase({
  selectedIntention,
  qualities,
  qualityType,
  qualityDirection,
}: {
  selectedIntention: Intention;
  qualities: Quality[];
  qualityType: QualityType;
  qualityDirection: QualityDirection;
}) {
  return (
    <>
      <br />
      <strong>{selectedIntention.name}</strong>{" "}
      {getQualityTypeDescription(
        qualityType,
        qualities.length > 1,
        qualityDirection
      )}
      {qualities.map((e, i) => (
        <span key={uuidv4()}>
          <LinkHoverChip
            label={e.name}
            color={getChipColor(e.type)}
            element={e}
          />
          {elementIsNotFirstOrLast(i, qualities.length) && ", "}
          {elementIsNotFirstOrLast(i, qualities.length) &&
            i === qualities.length - 2 &&
            ", "}
        </span>
      ))}
      .
      <br />
    </>
  );
}
