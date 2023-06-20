import Actor from "@/types/Actor";
import {
  combineDependenciesByDependee,
  combineDependenciesByDepender,
  getRequiredDependencies,
  getRequiringDependencies,
} from "@/util/DependencyUtil";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DependencyText from "./DependencyText";
import LinkHoverChip from "./LinkHoverChip";
import { ActorsContext } from "./context/ActorsContext";
import { DependenciesContext } from "./context/DependenciesContext";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";
import { SelectedIntentionContext } from "./context/SelectedIntentionContext";

export default function DependenciesPhrase({
  dependencyIDs,
  elementName,
}: {
  dependencyIDs: string[];
  elementName: string;
}) {
  const dependencies = useContext(DependenciesContext);
  const actors = useContext(ActorsContext);
  const selectedActor = useContext(SelectedActorContext);
  const setSelectedActor = useContext(SelectedActorDispatchContext);
  const selectedIntention = useContext(SelectedIntentionContext);

  const requiredDependencies = getRequiredDependencies(
    dependencyIDs,
    dependencies,
    selectedActor
  );
  const combinedRequiredDependencies = combineDependenciesByDependee(
    requiredDependencies,
    actors
  );
  const requiringDependencies = getRequiringDependencies(
    dependencyIDs,
    dependencies,
    selectedActor
  );
  const combinedRequiringDependencies = combineDependenciesByDepender(
    requiringDependencies,
    actors
  );

  const requiredCount = requiredDependencies.length;
  const requiringCount = requiringDependencies.length;

  return (
    <>
      {requiredCount > 0 && (
        <>
          <br />
          <strong>{elementName}</strong> has{" "}
          <strong>{numberText(requiredCount)}</strong>{" "}
          {requiredCount === 1 ? "dependency" : "dependencies"}.
          <br />
          <strong>{elementName}</strong> depends on{" "}
          {combinedRequiredDependencies.map((da, i) => (
            <span key={uuidv4()}>
              {elementIsNotFirstOrLast(
                i,
                combinedRequiredDependencies.length
              ) && ", on "}
              {elementIsLast(i, combinedRequiredDependencies.length) &&
                " and on "}
              <LinkHoverChip
                label={da.actorName}
                element={actors.get(da.id)}
                color="primary"
              />{" "}
            </span>
          ))}
          . <br />
          {combinedRequiredDependencies.map((da, i) => (
            <>
              <LinkHoverChip
                label={da.actorName}
                element={actors.get(da.id)}
                color="primary"
              />{" "}
              has to:
              {da.dependencies.map((d, i) => (
                <span key={uuidv4()}>
                  <DependencyText dependency={d} showPrefix />
                </span>
              ))}
            </>
          ))}
          <br />
        </>
      )}
      {requiringCount > 0 && (
        <>
          <br />
          There {requiringCount > 1 ? "are" : "is"}{" "}
          <strong>{numberText(requiringCount)}</strong>{" "}
          {requiringCount === 1 ? "dependency" : "dependencies"} where other
          actors depend on <strong>{elementName}</strong> to achieve a goal,
          complete a task, ensure a quality or provide a resource.
          <br />
          {combinedRequiringDependencies.map((da, i) => (
            <>
              <br />
              <span key={uuidv4()}>
                <LinkHoverChip
                  label={da.actorName}
                  element={actors.get(da.id)}
                  color="primary"
                />{" "}
                depends on:
                {da.dependencies.map((d, i) => (
                  <span key={uuidv4()}>
                    <DependencyText dependency={d} />
                  </span>
                ))}
              </span>
            </>
          ))}
          <br />
        </>
      )}
    </>
  );

  function updateSelectedActor(actorId: string) {
    setSelectedActor(actors.get(actorId) as Actor);
  }

  function elementIsNotFirstOrLast(index: number, count: number) {
    return count > 1 && index > 0 && index < count - 2;
  }

  function elementIsLast(index: number, count: number) {
    return index > 0 && index === count - 1;
  }

  function numberText(n: number) {
    if (n === 1) return "one";
    if (n === 2) return "two";
    if (n === 3) return "three";
    return n;
  }
}
