import Actor from "@/types/Actor";
import { getActorTypeDescription } from "@/types/actorType";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DependenciesPhrase from "./DependenciesPhrase";
import IntentionsPhrase from "./IntentionsPhrase";
import LinkHoverChip from "./LinkHoverChip";
import { ActorsContext } from "./context/ActorsContext";

export default function ActorDetails({ actor }: { actor: Actor }) {
  const actors = useContext(ActorsContext);

  const ieCount = actor.elements.length;

  return (
    <>
      <Typography>{actor.description}</Typography>
      <Typography>
        <strong>{actor.name} </strong>is {getActorTypeDescription(actor.type)}
        <br />
        {actor.linksTo.length > 0 && (
          <>
            <br />
            {actor.linksTo.map((e, i) => (
              <span key={uuidv4()}>
                {actor.name} {e.type}{" "}
                <LinkHoverChip
                  label={actors.get(e.id)?.name}
                  element={actors.get(e.id)}
                />
                .
              </span>
            ))}
            <br />
          </>
        )}
        {ieCount > 0 && <IntentionsPhrase actor={actor} />}
        <DependenciesPhrase
          dependencyIDs={actor.dependencies}
          elementName={actor.name}
        />
      </Typography>
    </>
  );
}
