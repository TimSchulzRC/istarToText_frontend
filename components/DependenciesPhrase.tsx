import Actor from "@/types/Actor";
import {
  combineDependenciesByDependee,
  combineDependenciesByDepender,
  getRequiredDependencies,
  getRequiringDependencies,
} from "@/util/DependencyUtil";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DependencyText from "./DependencyText";
import LinkHoverChip from "./LinkHoverChip";
import { ActorsContext } from "./context/ActorsContext";
import { DependenciesContext } from "./context/DependenciesContext";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";

/**
 * A component that displays the dependencies of an intentional element (goal or task) and the dependencies on it by other actors. It uses the `DependenciesContext`, `ActorsContext`, and `SelectedActorContext` contexts to retrieve the dependencies and actors, and the `SelectedActorDispatchContext` context to update the selected actor. It also uses the `LinkHoverChip` and `DependencyText` components to display the dependencies and actors.
 *
 * @param dependencyIDs - The IDs of the dependencies of the intentional element.
 * @param elementName - The name of the intentional element.
 * @returns A JSX element that displays the dependencies of an intentional element (goal or task) and the dependencies on it by other actors.
 */
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
            <React.Fragment key={uuidv4()}>
              <LinkHoverChip
                label={da.actorName}
                element={actors.get(da.id)}
                color="primary"
              />{" "}
              has to:
              {da.dependencies.map((d, i) => (
                <DependencyText dependency={d} showPrefix key={uuidv4()} />
              ))}
            </React.Fragment>
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
            <React.Fragment key={uuidv4()}>
              <br />
              <span key={uuidv4()}>
                <LinkHoverChip
                  label={da.actorName}
                  element={actors.get(da.id)}
                  color="primary"
                />{" "}
                depends on:
                {da.dependencies.map((d, i) => (
                  <DependencyText dependency={d} key={uuidv4()} />
                ))}
              </span>
            </React.Fragment>
          ))}
          <br />
        </>
      )}
    </>
  );

  /**
   * A function that updates the selected actor in the `SelectedActorDispatchContext` context with the actor that has the specified ID.
   *
   * @param actorId - The ID of the actor to set as the selected actor.
   */
  function updateSelectedActor(actorId: string) {
    setSelectedActor(actors.get(actorId) as Actor);
  }

  /**
   * A function that returns true if the element at the specified index is not the first or last element in a list of the specified count.
   *
   * @param index - The index of the element to check.
   * @param count - The total number of elements in the list.
   * @returns True if the element at the specified index is not the first or last element in a list of the specified count, false otherwise.
   */
  function elementIsNotFirstOrLast(index: number, count: number) {
    return count > 1 && index > 0 && index < count - 2;
  }

  /**
   * A function that returns true if the element at the specified index is the last element in a list of the specified count.
   *
   * @param index - The index of the element to check.
   * @param count - The total number of elements in the list.
   * @returns True if the element at the specified index is the last element in a list of the specified count, false otherwise.
   */
  function elementIsLast(index: number, count: number) {
    return index > 0 && index === count - 1;
  }

  /**
   * A function that returns the text representation of a number as a word, for numbers 1 to 3, or as the number itself for other numbers.
   *
   * @param n - The number to convert to text.
   * @returns The text representation of the number as a word, for numbers 1 to 3, or as the number itself for other numbers.
   */
  function numberText(n: number) {
    if (n === 1) return "one";
    if (n === 2) return "two";
    if (n === 3) return "three";
    return n;
  }
}
