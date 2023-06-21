import Actor from "@/types/Actor";
import { ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { ActorsContext } from "./context/ActorsContext";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";

export default function ActorListItem({ actor }: propTypes) {
  const actors = React.useContext(ActorsContext);
  const selectedActor = React.useContext(SelectedActorContext);
  const setSelectedActor = React.useContext(SelectedActorDispatchContext);
  const setSelectedIntentionalElement = React.useContext(
    SelectedIntentionDispatchContext
  );
  const clickHandler = () => {
    setSelectedActor(actor);
    setSelectedIntentionalElement(null);
  };

  let linksTo;
  if (actor.linksTo.length !== 0) {
    linksTo = actor.linksTo
      .map((e) => actors.get(e.id)?.name)
      .reduce((acc, cur) => acc + ", " + cur);
    console.log(linksTo);
    linksTo = " (" + linksTo + ")";
  }

  const secondaryText = linksTo ? actor.type + linksTo : actor.type;

  return (
    <ListItemButton
      onClick={clickHandler}
      selected={actor.id === selectedActor.id}
    >
      <ListItemText primary={actor.name} secondary={secondaryText} />
    </ListItemButton>
  );
}
type propTypes = { actor: Actor };
