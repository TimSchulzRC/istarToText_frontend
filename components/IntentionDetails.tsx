import Actor from "@/types/Actor";
import Dependency from "@/types/Dependency";
import IntentionalElement from "@/types/IntentionalElement";
import {
  IntentionType,
  getIntentionTypeDescription,
} from "@/types/intentionType";
import { Chip, Typography } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { DependenciesContext } from "./context/DependenciesContext";
import { SelectedActorContext } from "./context/SelectedActorContext";
import {
  QualityType,
  getQualityTypeDescription,
  getQualityTypeDescriptionPlural,
} from "@/types/qualityType";
import { ActorsContext } from "./context/ActorsContext";
import DependenciesPhrase from "./DependenciesPhrase";

export default function IntentionDetails({
  intention: selectedIntention,
}: {
  intention: IntentionalElement;
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
  const qualities = selectedIntention.qualities.map((q) => ({
    qualityType: q.type,
    ...selectedActor.elements.find((e) => q.id === e.id),
  }));
  const qualitiesCount = qualities.length;
  const qualitiesQualifies = qualities.filter(
    (e) => e.qualityType === QualityType.QUALIFY
  );
  const qualitiesHelp = qualities.filter(
    (e) => e.qualityType === QualityType.HELP
  );
  const qualitiesMake = qualities.filter(
    (e) => e.qualityType === QualityType.MAKE
  );
  const qualitiesHurt = qualities.filter(
    (e) => e.qualityType === QualityType.HURT
  );
  const qualitiesBreaks = qualities.filter(
    (e) => e.qualityType === QualityType.BREAK
  );

  console.log("intentionDependencies:", intentionDependencies);
  return (
    <>
      <Typography>
        {selectedIntention.name}{" "}
        {getIntentionTypeDescription(selectedIntention.type)}
        {selectedIntention.children.length > 0 && (
          <>
            <br />
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
                    <Chip
                      key={uuidv4()}
                      color="warning"
                      component={"span"}
                      onClick={() => {}}
                      label={e.name}
                    />
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
                    <Chip
                      key={uuidv4()}
                      color="secondary"
                      component={"span"}
                      onClick={() => {}}
                      label={e.name}
                    />
                    {!elementIsLast(i, selectedElementSubGoalsCount) &&
                      selectedElementSubGoalsCount > 1 &&
                      selectedIntention.childrenLinkType}
                  </span>
                ))}{" "}
              </>
            )}
            .
          </>
        )}
        {qualitiesCount > 0 && (
          <>
            <br />
            <br />
            {qualitiesQualifies.length > 0 && (
              <>
                {qualitiesQualifies.map((e, i) => (
                  <span key={uuidv4()}>
                    <Chip component="span" label={e.name} color="success" />{" "}
                    {elementIsNotFirstOrLast(i, qualitiesQualifies.length) &&
                      ", "}
                  </span>
                ))}
                {qualitiesQualifies.length === 1 ? "qualifies" : "qualify"}
                qualifies how the operation or function of{" "}
                <strong>{selectedIntention.name}</strong> should be achieved. .
                <br />
              </>
            )}
            {qualitiesHelp.length > 0 && (
              <>
                <strong>{selectedIntention.name}</strong>{" "}
                {qualitiesHelp.length === 1
                  ? getQualityTypeDescription(QualityType.HELP)
                  : getQualityTypeDescriptionPlural(QualityType.HELP)}
                {qualitiesHelp.map((e, i) => (
                  <span key={uuidv4()}>
                    <Chip component="span" label={e.name} color="success" />
                    {elementIsNotFirstOrLast(i, qualitiesHelp.length) && ", "}
                    {elementIsNotFirstOrLast(i, qualitiesHelp.length) &&
                      i === qualitiesHelp.length - 2 &&
                      ", "}
                  </span>
                ))}
                .
                <br />
              </>
            )}
            {qualitiesMake.length > 0 && (
              <>
                <strong>{selectedIntention.name}</strong>{" "}
                {qualitiesMake.length === 1
                  ? getQualityTypeDescription(QualityType.MAKE)
                  : getQualityTypeDescriptionPlural(QualityType.MAKE)}
                {qualitiesMake.map((e, i) => (
                  <span key={uuidv4()}>
                    <Chip component="span" label={e.name} color="success" />
                    {elementIsNotFirstOrLast(i, qualitiesMake.length) && ", "}
                    {elementIsNotFirstOrLast(i, qualitiesMake.length) &&
                      i === qualitiesMake.length - 2 &&
                      ", "}
                  </span>
                ))}
                .
                <br />
              </>
            )}
            {qualitiesHurt.length > 0 && (
              <>
                <strong>{selectedIntention.name}</strong>{" "}
                {qualitiesHurt.length === 1
                  ? getQualityTypeDescription(QualityType.HURT)
                  : getQualityTypeDescriptionPlural(QualityType.HURT)}
                {qualitiesHurt.map((e, i) => (
                  <span key={uuidv4()}>
                    <Chip component="span" label={e.name} color="success" />
                    {elementIsNotFirstOrLast(i, qualitiesHurt.length) && ", "}
                    {elementIsNotFirstOrLast(i, qualitiesHurt.length) &&
                      i === qualitiesHurt.length - 2 &&
                      ", "}
                  </span>
                ))}
                .
                <br />
              </>
            )}
            {qualitiesBreaks.length > 0 && (
              <>
                <strong>{selectedIntention.name}</strong>{" "}
                {qualitiesBreaks.length === 1
                  ? getQualityTypeDescription(QualityType.BREAK)
                  : getQualityTypeDescriptionPlural(QualityType.BREAK)}
                {qualitiesBreaks.map((e, i) => (
                  <span key={uuidv4()}>
                    <Chip component="span" label={e.name} color="success" />
                    {elementIsNotFirstOrLast(i, qualitiesBreaks.length) && ", "}
                    {elementIsNotFirstOrLast(i, qualitiesBreaks.length) &&
                      i === qualitiesBreaks.length - 2 &&
                      ", "}
                  </span>
                ))}
                .
              </>
            )}
          </>
        )}
        {/* dependencies */}
        {intentionDependencies.length > 0 && (
          <DependenciesPhrase
            dependencyIDs={selectedIntention.dependencies}
            elementName={selectedIntention.name}
          />
        )}
      </Typography>
    </>
  );

  function elementIsNotFirstOrLast(index: number, count: number) {
    return count > 1 && index > 0 && index < count - 2;
  }

  function elementIsLast(index: number, count: number) {
    return index > 0 && index === count - 1;
  }

  function getDependencies(actor: Actor) {
    return actor.dependencies.map(
      (e) => dependencies.get(e) || ({} as Dependency)
    );
  }
}
