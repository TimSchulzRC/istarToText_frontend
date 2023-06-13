import {
  getRequiredDependencies,
  combineDependenciesByDependee,
  getRequiringDependencies,
  combineDependenciesByDepender,
} from "@/util/DependencyUtil";
import { Chip } from "@mui/material";
import React, { useContext } from "react";
import DependencyText from "./DependencyText";
import { ActorsContext } from "./context/ActorsContext";
import { DependenciesContext } from "./context/DependenciesContext";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";
import Actor from "@/types/Actor";
import { v4 as uuidv4 } from "uuid";

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
          <strong>{numberText(requiredCount)}</strong> required{" "}
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
              <Chip
                component="span"
                size="small"
                label={da.actorName}
                onClick={() => updateSelectedActor(da.id)}
              />{" "}
              to
              {da.dependencies.map((d, i) => (
                <span key={uuidv4()}>
                  {elementIsNotFirstOrLast(i, da.dependencies.length) && ", "}
                  {elementIsLast(i, da.dependencies.length) && " and "}
                  <DependencyText dependency={d} />
                </span>
              ))}
            </span>
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
          actors depend on <strong>{elementName}</strong>.
          <br />
          <strong>{elementName}</strong> is depended on by{" "}
          {combinedRequiringDependencies.map((da, i) => (
            <span key={uuidv4()}>
              {elementIsNotFirstOrLast(
                i,
                combinedRequiringDependencies.length
              ) && ", on "}
              {elementIsLast(i, combinedRequiringDependencies.length) &&
                " and on "}
              <Chip
                component="span"
                size="small"
                label={da.actorName}
                onClick={() => updateSelectedActor(da.id)}
              />{" "}
              to
              {da.dependencies.map((d, i) => (
                <span key={uuidv4()}>
                  {elementIsNotFirstOrLast(i, da.dependencies.length) && ", "}
                  {elementIsLast(i, da.dependencies.length) && " and "}
                  <DependencyText dependency={d} />
                </span>
              ))}
            </span>
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
