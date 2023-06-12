import { getActorTypeDescription } from "@/types/actorType";
import {
  combineDependenciesByDependee,
  combineDependenciesByDepender,
  getRequiredDependencies,
  getRequiringDependencies,
} from "@/util/DependencyUtil";
import { Chip, Typography } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DependenciesPhrase from "./DependenciesPhrase";
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

  const requiredDependencies = getRequiredDependencies(
    selectedActor.dependencies,
    dependencies,
    selectedActor
  );
  const combinedRequiredDependencies = combineDependenciesByDependee(
    requiredDependencies,
    actors
  );
  const requiringDependencies = getRequiringDependencies(
    selectedActor.dependencies,
    dependencies,
    selectedActor
  );
  const combinedRequiringDependencies = combineDependenciesByDepender(
    requiringDependencies,
    actors
  );

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
        <DependenciesPhrase
          dependencyIDs={selectedActor.dependencies}
          elementName={selectedActor.name}
        />
      </Typography>
    </>
  );

  function numberText(n: number) {
    if (n === 1) return "one";
    if (n === 2) return "two";
    if (n === 3) return "three";
    return n;
  }
}
