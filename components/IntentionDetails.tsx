import Intention from "@/types/Intention";
import Quality from "@/types/Quality";
import {
  IntentionType,
  getIntentionTypeDescription,
} from "@/types/intentionType";
import { elementIsLast, elementIsNotFirstOrLast } from "@/util/ElementListUtil";
import { Chip, Typography } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DependenciesPhrase from "./DependenciesPhrase";
import QualityDetails from "./QualityDetails";
import { ActorsContext } from "./context/ActorsContext";
import { DependenciesContext } from "./context/DependenciesContext";
import { SelectedActorContext } from "./context/SelectedActorContext";
import LinkHoverChip from "./LinkHoverChip";

export default function IntentionDetails({
  intention: selectedIntention,
}: {
  intention: Intention;
}) {
  const actors = useContext(ActorsContext);
  const selectedActor = useContext(SelectedActorContext);
  const dependencies = useContext(DependenciesContext);
  const intentionDependencies = selectedIntention.dependencies.map((d) => ({
    ...dependencies.get(d),
    dependee: actors.get(dependencies.get(d)?.dependee || ""),
  }));
  const children = selectedActor.elements.filter((e) =>
    selectedIntention.children.includes(e.id)
  );
  const selectedElementSubGoals = children.filter(
    (e) => e.type === IntentionType.GOAL
  );
  const selectedElementSubGoalsCount = selectedElementSubGoals.length;
  const selectedElementTasks = children.filter(
    (e) => e.type === IntentionType.TASK
  );
  const selectedElementTasksCount = selectedElementTasks.length;
  const qualities: Quality[] = selectedIntention.qualities.map((q) => ({
    qualityType: q.type,
    direction: q.direction,
    ...(selectedActor.elements.find((e) => q.id === e.id) as Intention),
  }));

  return (
    <>
      <Typography>
        {selectedIntention.name}{" "}
        {getIntentionTypeDescription(selectedIntention.type)}
        <br />
        {selectedIntention.children.length > 0 && (
          <>
            <br />
            To
            {selectedIntention.type === IntentionType.GOAL && " achieve "}
            {selectedIntention.type === IntentionType.TASK && " complete "}
            {selectedIntention.type === IntentionType.QUALITY && " ensure "}
            {selectedIntention.type === IntentionType.RESOURCE && " obtain "}
            <strong>{selectedIntention.name}</strong>, {selectedActor.name} has
            to{" "}
            {selectedElementSubGoalsCount > 0 && (
              <>
                achieve{" "}
                {selectedElementSubGoals.map((e, i) => (
                  <span key={uuidv4()}>
                    {elementIsNotFirstOrLast(i, selectedElementSubGoalsCount) &&
                      ", "}{" "}
                    {elementIsLast(i, selectedElementSubGoalsCount) &&
                      selectedIntention.childrenLinkType}{" "}
                    <LinkHoverChip label={e.name} element={e} color="warning" />
                    {!elementIsLast(i, selectedElementSubGoalsCount) &&
                      selectedElementSubGoalsCount > 1 &&
                      selectedIntention.childrenLinkType}
                  </span>
                ))}{" "}
              </>
            )}
            {selectedElementTasksCount > 0 && (
              <>
                {selectedElementSubGoalsCount > 0 &&
                  selectedIntention.childrenLinkType}{" "}
                complete{" "}
                {selectedElementTasks.map((e, i) => (
                  <span key={uuidv4()}>
                    {elementIsNotFirstOrLast(i, selectedElementTasksCount) &&
                      ", "}{" "}
                    {elementIsLast(i, selectedElementTasksCount) &&
                      selectedElementTasksCount > 1 &&
                      selectedIntention.childrenLinkType}{" "}
                    <LinkHoverChip
                      label={e.name}
                      element={e}
                      color="secondary"
                    />
                    {!elementIsLast(i, selectedElementSubGoalsCount) &&
                      selectedElementSubGoalsCount > 1 &&
                      selectedIntention.childrenLinkType}
                  </span>
                ))}{" "}
              </>
            )}
            .
            <br />
          </>
        )}
        <QualityDetails qualities={qualities} />
        {intentionDependencies.length > 0 && (
          <DependenciesPhrase
            dependencyIDs={selectedIntention.dependencies}
            elementName={selectedIntention.name}
          />
        )}
      </Typography>
    </>
  );
}
