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

export default function IntentionDetails({
  intention: selectedIntention,
}: {
  intention: IntentionalElement;
}) {
  const selectedActor = useContext(SelectedActorContext);
  const dependencies = useContext(DependenciesContext);
  const children = selectedIntention.children;
  console.log(children);
  const selectedElementSubGoals = children.filter(
    (e) => e.type === IntentionType.GOAL
  );
  const selectedElementSubGoalsCount = selectedElementSubGoals.length;
  const selectedElementTasks = children.filter(
    (e) => e.type === IntentionType.TASK
  );
  const selectedElementTasksCount = selectedElementTasks.length;

  return (
    <>
      <Typography>
        {selectedIntention.name}{" "}
        {getIntentionTypeDescription(selectedIntention.type)}
        .
        <br />
        <br />
        {selectedIntention.children.length > 0 && (
          <>
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
                {/* {selectedIntention.childrenLinkType === "and" && "have "}
                {selectedIntention.childrenLinkType === "or" && "has "} */}
              </>
            )}
          </>
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
