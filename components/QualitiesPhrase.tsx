import Intention from "@/types/Intention";
import Quality, { QualityDirection } from "@/types/Quality";
import { QualityType, getQualityTypeDescription } from "@/types/qualityType";
import { getChipColor } from "@/util/DisplayUtil";
import { elementIsNotFirstOrLast } from "@/util/ElementListUtil";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import LinkHoverChip from "./LinkHoverChip";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";

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
  const setSelectedIntentionalElement = useContext(
    SelectedIntentionDispatchContext
  );

  function getColor(quality: Quality) {
    return getChipColor(quality.type);
  }

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
          <LinkHoverChip label={e.name} color={getColor(e)} element={e} />
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
