import { ActorType } from "@/types/actorType";
import { ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";
import Actor from "@/types/Actor";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";

export default function ActorListItem({ actor }: propTypes) {
  const selectedActor = React.useContext(SelectedActorContext);
  const setSelectedActor = React.useContext(SelectedActorDispatchContext);
  const setSelectedIntentionalElement = React.useContext(
    SelectedIntentionDispatchContext
  );
  const clickHandler = () => {
    setSelectedActor(actor);
    setSelectedIntentionalElement(null);
  };

  return (
    <ListItemButton
      onClick={clickHandler}
      selected={actor.id === selectedActor.id}
    >
      <ListItemText primary={actor.name} secondary={actor.type} />
    </ListItemButton>
  );
}
type propTypes = { actor: Actor };
