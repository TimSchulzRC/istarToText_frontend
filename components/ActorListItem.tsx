import Actor from "@/types/Actor";
import { ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { ActorsContext } from "./context/ActorsContext";
import { AddHistoryItemContext } from "./context/HistoryContext";
import {
  SelectedActorContext,
  SelectedActorDispatchContext,
} from "./context/SelectedActorContext";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";

/**
 * A component that displays a single actor item in a list, including its name, type, and links to other actors.
 *
 * @param actor - The actor object to display in the list item.
 */
export default function ActorListItem({ actor }: propTypes) {
  const actors = React.useContext(ActorsContext);
  const selectedActor = React.useContext(SelectedActorContext);
  const setSelectedActor = React.useContext(SelectedActorDispatchContext);
  const setSelectedIntention = React.useContext(
    SelectedIntentionDispatchContext
  );
  const addHistoryItem = React.useContext(AddHistoryItemContext);

  /**
   * Handles the click event on the list item by setting the selected actor and clearing the selected intentional element.
   */
  const clickHandler = () => {
    setSelectedActor(actor);
    addHistoryItem(actor);
    setSelectedIntention(null);
  };

  let linksTo;
  if (actor.linksTo.length !== 0) {
    linksTo = actor.linksTo
      .map((e) => ({
        name: actors.get(e.id)?.name,
        type: e.type,
      }))
      .reduce((acc, curr) => {
        const name = curr.name;
        const type =
          curr.type === "participates in" ? "participate as" : curr.type;

        if (acc === "") {
          return type + " " + name;
        } else {
          return acc + ", " + type + " " + name;
        }
      }, "");
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
