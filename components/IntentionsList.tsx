import Intention from "@/types/Intention";
import {
  ExpandLess,
  ExpandMore,
  Flag,
  GppGood,
  Inventory,
  Task,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ListCard from "./cards/ListCard";
import { AddHistoryItemContext } from "./context/HistoryContext";
import { SelectedActorContext } from "./context/SelectedActorContext";
import {
  SelectedIntentionContext,
  SelectedIntentionDispatchContext,
} from "./context/SelectedIntentionContext";

/**
 * A component that displays a list of intentional elements for the selected actor, including goals, tasks, and resources.
 *
 * @returns A JSX element that displays a list of intentional elements for the selected actor, including goals, tasks, and resources.
 */
export default function IntentionsList() {
  const selectedActor = React.useContext(SelectedActorContext);
  const selectedIntentionalElement = React.useContext(SelectedIntentionContext);
  const setSelectedIntention = React.useContext(
    SelectedIntentionDispatchContext
  );
  const addHistoryItem = React.useContext(AddHistoryItemContext);
  const qualities = getQualities();
  const updateSelectedIntention = (i: Intention) => {
    setSelectedIntention(i);
    addHistoryItem(i);
  };
  const onClickHandler = (element: Intention) => {
    selectedIntentionalElement === element
      ? setSelectedIntention(null)
      : updateSelectedIntention(element);
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (selectedIntentionalElement?.type.toLowerCase() === "quality") {
      setOpen(true);
    }
  }, [selectedIntentionalElement]);

  return (
    <ListCard title="Intensions">
      {getAllButQualities().map((element) => (
        <ListItemButton
          onClick={() => onClickHandler(element)}
          key={uuidv4()}
          selected={element.id === selectedIntentionalElement?.id}
        >
          <ListItemIcon>
            {element.type.toLowerCase() === "goal" && <Flag />}
            {element.type.toLowerCase() === "task" && <Task />}
            {element.type.toLowerCase() === "resource" && <Inventory />}
          </ListItemIcon>
          <ListItemText primary={element.name} secondary={element.type} />
        </ListItemButton>
      ))}
      <Divider />
      {qualities.length > 0 && (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GppGood />
            </ListItemIcon>
            <ListItemText primary="Qualities" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {qualities.map((element) => (
                <ListItemButton
                  onClick={() => onClickHandler(element)}
                  key={uuidv4()}
                  selected={element.id === selectedIntentionalElement?.id}
                >
                  <ListItemText
                    primary={element.name}
                    // secondary={element.type}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}
      {selectedActor.elements.length === 0 && (
        <ListItem>
          <ListItemText primary="This actor has not intentions" />
        </ListItem>
      )}
    </ListCard>
  );

  /**
   * Returns an array of all the qualities for the selected actor.
   *
   * @returns An array of all the qualities for the selected actor.
   */
  function getQualities() {
    return selectedActor.elements.filter(
      (element) => element.type.toLowerCase() === "quality"
    );
  }

  /**
   * Returns an array of all the intentional elements for the selected actor, except for qualities.
   *
   * @returns An array of all the intentional elements for the selected actor, except for qualities.
   */
  function getAllButQualities() {
    return selectedActor.elements.filter(
      (element) => element.type.toLowerCase() !== "quality"
    );
  }
}
