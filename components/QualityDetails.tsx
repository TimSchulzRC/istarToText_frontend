import Quality, { QualityDirection } from "@/types/Quality";
import { QualityType } from "@/types/qualityType";
import { elementIsNotFirstOrLast } from "@/util/ElementListUtil";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import QualitiesPhrase from "./QualitiesPhrase";
import {
  SelectedIntentionContext,
  SelectedIntentionDispatchContext,
} from "./context/SelectedIntentionalElementContext";

export default function QualityDetails({
  qualities,
}: {
  qualities: Quality[];
}) {
  const selectedIntention = useContext(SelectedIntentionContext);
  const setSelectedIntentionalElement = useContext(
    SelectedIntentionDispatchContext
  );
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

  return (
    <>
      {qualitiesCount > 0 && selectedIntention && (
        <>
          <br />
          {qualitiesQualifies.length > 0 && (
            <>
              {qualitiesQualifies.map((e, i) => (
                <span key={uuidv4()}>
                  <Chip
                    component="span"
                    label={e.name}
                    color="success"
                    size="small"
                    onClick={() => {
                      setSelectedIntentionalElement(e);
                    }}
                  />{" "}
                  {elementIsNotFirstOrLast(i, qualitiesQualifies.length) &&
                    ", "}
                </span>
              ))}
              {qualitiesQualifies.length === 1 ? "qualifies" : "qualify"} how
              the operation or function of{" "}
              <strong>{selectedIntention.name}</strong> should be achieved.
            </>
          )}
          <br />
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