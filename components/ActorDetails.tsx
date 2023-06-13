import { getActorTypeDescription } from "@/types/actorType";
import { Chip, Typography } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DependenciesPhrase from "./DependenciesPhrase";
import IntentionsPhrase from "./IntentionsPhrase";
import { ActorsContext } from "./context/ActorsContext";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";
import Actor from "@/types/Actor";

export default function ActorDetails() {
  const actors = useContext(ActorsContext);
  const selectedActor = useContext(SelectedActorContext);
  const setSelectedActor = useContext(SelectedActorDispatchContext);

  const ieCount = selectedActor.elements.length;

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
                <Chip
                  component={"span"}
                  label={actors.get(e.id)?.name}
                  size="small"
                  onClick={() => setSelectedActor(actors.get(e.id) as Actor)}
                />
                .
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
}
