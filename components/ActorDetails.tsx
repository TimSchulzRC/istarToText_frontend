import Actor from "@/types/Actor";
import Dependency from "@/types/Dependency";
import { getActorTypeDescription } from "@/types/actorType";
import { IntentionType } from "@/types/intentionType";
import { Chip, Typography } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DependencyText from "./DependencyText";
import IntentionsPhrase from "./IntentionsPhrase";
import { ActorsContext } from "./context/ActorsContext";
import { DependenciesContext } from "./context/DependenciesContext";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";

export default function ActorDetails() {
  const dependencies = useContext(DependenciesContext);
  const actors = useContext(ActorsContext);
  const selectedActor = useContext(SelectedActorContext);
  const setSelectedActor = useContext(SelectedActorDispatchContext);

  const requiredDependencies = getRequiredDependencies(selectedActor);
  const combinedRequiredDependencies =
    combineDependenciesByDependee(requiredDependencies);
  const requiringDependencies = getRequiringDependencies(selectedActor);
  const combinedRequiringDependencies = combineDependenciesByDepender(
    requiringDependencies
  );

  console.log(combinedRequiredDependencies);

  const ieCount = selectedActor.elements.length;
  const requiredCount = requiredDependencies.length;
  const requiringCount = requiringDependencies.length;

  return (
    <>
      <Typography>{selectedActor.description}</Typography>

      <Typography>
        <strong>{selectedActor.name} </strong>is{" "}
        {getActorTypeDescription(selectedActor.type)}
        <br />
        <br />
        {selectedActor.linksTo.length > 0 && (
          <>
            {selectedActor.linksTo.map((e, i) => (
              <span key={uuidv4()}>
                {selectedActor.name} {e.type}{" "}
                <Chip component={"span"} label={actors.get(e.id)?.name} />.
              </span>
            ))}
            <br />
            <br />
          </>
        )}
        {ieCount > 0 && <IntentionsPhrase actor={selectedActor} />}
        {requiredCount > 0 && (
          <>
            <br />
            <br />
            <strong>{selectedActor.name}</strong> has{" "}
            <strong>{numberText(requiredCount)}</strong> requiring{" "}
            {requiredCount === 1 ? "dependency" : "dependencies"}.
            <br />
            <strong>{selectedActor.name}</strong> depends on{" "}
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
            .
            <br />
            <br />
            <strong>{selectedActor.name}</strong> has{" "}
            <strong>{numberText(requiringCount)}</strong> requiring{" "}
            {requiringCount === 1 ? "dependency" : "dependencies"}.
            <br />
            <strong>{selectedActor.name}</strong> is depended on by{" "}
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
          </>
        )}
      </Typography>
    </>
  );

  function updateSelectedActor(actorId: string) {
    setSelectedActor(actors.get(actorId) as Actor);
  }

  function elementIsNotFirstOrLast(index: number, count: number) {
    return ieCount > 1 && index > 0 && index < count - 2;
  }

  function elementIsLast(index: number, count: number) {
    return index > 0 && index === count - 1;
  }

  function getRequiredDependencies(actor: Actor) {
    return actor.dependencies
      .filter((e) => dependencies.get(e)?.dependee !== actor.id)
      .map((e) => dependencies.get(e)) as Dependency[];
  }

  function getRequiringDependencies(actor: Actor) {
    return actor.dependencies
      .filter((e) => dependencies.get(e)?.dependee === actor.id)
      .map((e) => dependencies.get(e)) as Dependency[];
  }

  function combineDependenciesByDependee(dependencies: Dependency[]) {
    const combinedDependencies: Map<
      string,
      {
        id: string;
        actorName: string;
        dependencies: { name: string; type: IntentionType }[];
      }
    > = new Map();
    dependencies.forEach((d) => {
      if (!combinedDependencies.get(d.dependee)) {
        combinedDependencies.set(d.dependee, {
          id: d.dependee,
          actorName: actors.get(d.dependee)?.name || "",
          dependencies: [{ name: d.name, type: d.type }],
        });
      } else {
        combinedDependencies.get(d.dependee)?.dependencies.push({
          name: d.name,
          type: d.type,
        });
      }
    });

    return Array.from(combinedDependencies.values());
  }

  function combineDependenciesByDepender(dependencies: Dependency[]) {
    const combinedDependencies: Map<
      string,
      {
        id: string;
        actorName: string;
        dependencies: { name: string; type: IntentionType }[];
      }
    > = new Map();
    dependencies.forEach((d) => {
      if (!combinedDependencies.get(d.depender)) {
        combinedDependencies.set(d.depender, {
          id: d.depender,
          actorName: actors.get(d.depender)?.name || "",
          dependencies: [{ name: d.name, type: d.type }],
        });
      } else {
        combinedDependencies.get(d.depender)?.dependencies.push({
          name: d.name,
          type: d.type,
        });
      }
    });

    return Array.from(combinedDependencies.values());
  }

  function numberText(n: number) {
    if (n === 1) return "one";
    if (n === 2) return "two";
    if (n === 3) return "three";
    return n;
  }
}
