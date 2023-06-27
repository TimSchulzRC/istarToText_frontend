import Quality from "@/types/Quality";
import { QualityType } from "@/types/qualityType";
import { getChipColor } from "@/util/DisplayUtil";
import { elementIsNotFirstOrLast } from "@/util/ElementListUtil";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import LinkHoverChip from "./LinkHoverChip";
import QualitiesPhrase from "./QualitiesPhrase";
import { SelectedIntentionContext } from "./context/SelectedIntentionContext";

/**
 * A component that displays the details of a list of qualities, including the type and direction of the qualities, and how they relate to a selected intentional element.
 *
 * @param qualities - The list of qualities to display.
 * @returns A JSX element that displays the details of a list of qualities, including the type and direction of the qualities, and how they relate to a selected intentional element.
 */
export default function QualityDetails({
  qualities,
}: {
  qualities: Quality[];
}) {
  const selectedIntention = useContext(SelectedIntentionContext);
  const qualitiesCount = qualities.length;
  const qualitiesQualifies = qualities.filter(
    (e) => e.qualityType === QualityType.QUALIFY
  );
  const qualitiesOutgoing: Quality[] = qualities.filter(
    (e) => e.direction === "outgoing"
  );

  const qualitiesIncoming: Quality[] = qualities.filter(
    (e) => e.direction === "incoming"
  );

  const qualitiesHelpOutgoing = qualitiesOutgoing.filter(
    (e) => e.qualityType === QualityType.HELP
  );
  const qualitiesMakeOutgoing = qualitiesOutgoing.filter(
    (e) => e.qualityType === QualityType.MAKE
  );
  const qualitiesHurtOutgoing = qualitiesOutgoing.filter(
    (e) => e.qualityType === QualityType.HURT
  );
  const qualitiesBreaksOutgoing = qualitiesOutgoing.filter(
    (e) => e.qualityType === QualityType.BREAK
  );

  const qualitiesHelpIncoming = qualitiesIncoming.filter(
    (e) => e.qualityType === QualityType.HELP
  );
  const qualitiesMakeIncoming = qualitiesIncoming.filter(
    (e) => e.qualityType === QualityType.MAKE
  );
  const qualitiesHurtIncoming = qualitiesIncoming.filter(
    (e) => e.qualityType === QualityType.HURT
  );
  const qualitiesBreaksIncoming = qualitiesIncoming.filter(
    (e) => e.qualityType === QualityType.BREAK
  );

  console.log("Outgoing: ", qualitiesOutgoing);
  console.log("Incoming: ", qualitiesIncoming);

  return (
    <>
      {qualitiesCount > 0 && selectedIntention && (
        <>
          {qualitiesQualifies.length > 0 &&
            (selectedIntention.type === "quality" ? (
              <>
                <br />
                <strong>{selectedIntention.name}</strong> desires{" "}
                {qualitiesQualifies.map((e, i) => (
                  <span key={uuidv4()}>
                    <LinkHoverChip
                      label={e.name}
                      color={getChipColor(e.type)}
                      element={e}
                    />{" "}
                    {elementIsNotFirstOrLast(i, qualitiesQualifies.length) &&
                      ", "}
                  </span>
                ))}{" "}
                .
                <br />
              </>
            ) : (
              <>
                <br />
                {qualitiesQualifies.map((e, i) => (
                  <span key={uuidv4()}>
                    <LinkHoverChip label={e.name} color="success" element={e} />{" "}
                    {elementIsNotFirstOrLast(i, qualitiesQualifies.length) &&
                      ", "}
                  </span>
                ))}
                {qualitiesQualifies.length === 1
                  ? "is a desired quality"
                  : "are desired qualities"}{" "}
                of <strong>{selectedIntention.name}</strong>.
                <br />
              </>
            ))}
          {qualitiesHelpOutgoing.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesHelpOutgoing}
              qualityType={QualityType.HELP}
              qualityDirection="outgoing"
            />
          )}
          {qualitiesMakeOutgoing.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesMakeOutgoing}
              qualityType={QualityType.MAKE}
              qualityDirection="outgoing"
            />
          )}
          {qualitiesHurtOutgoing.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesHurtOutgoing}
              qualityType={QualityType.HURT}
              qualityDirection="outgoing"
            />
          )}
          {qualitiesBreaksOutgoing.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesBreaksOutgoing}
              qualityType={QualityType.BREAK}
              qualityDirection="outgoing"
            />
          )}
          {qualitiesHelpIncoming.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesHelpIncoming}
              qualityType={QualityType.HELP}
              qualityDirection="incoming"
            />
          )}
          {qualitiesMakeIncoming.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesMakeIncoming}
              qualityType={QualityType.MAKE}
              qualityDirection="incoming"
            />
          )}
          {qualitiesHurtIncoming.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesHurtIncoming}
              qualityType={QualityType.HURT}
              qualityDirection="incoming"
            />
          )}
          {qualitiesBreaksIncoming.length > 0 && (
            <QualitiesPhrase
              selectedIntention={selectedIntention}
              qualities={qualitiesBreaksIncoming}
              qualityType={QualityType.BREAK}
              qualityDirection="incoming"
            />
          )}
        </>
      )}
    </>
  );
}
