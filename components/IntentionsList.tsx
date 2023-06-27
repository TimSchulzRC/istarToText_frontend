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
  console.log(qualities[0]);
  return (
    <ListCard title="Intensions">
      {getAllButQualities().map((element) => {
        const qualities = getQualities().filter((q) =>
          element.qualities.map((qRef) => qRef.id).includes(q.id)
        );
        let qualityText = "";
        if (qualities.length === 1)
          qualityText += "that desires the quality " + qualities[0].name + ")";
        else if (qualities.length > 1) {
          qualityText += "that desires the qualities ";
          for (let i = 0; i < qualities.length; i++) {
            if (i === qualities.length - 1)
              qualityText += " and " + qualities[i].name;
            else if (i === 0) qualityText += qualities[i].name;
            else qualityText += ", " + qualities[i].name;
          }
        }

        return (
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
            <ListItemText
              primary={element.name}
              secondary={
                <>
                  A <strong>{element.type}</strong> {qualityText}
                </>
              }
            />
          </ListItemButton>
        );
      })}
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
              {qualities.map((element) => {
                const qualities = getQualities().filter((q) =>
                  element.qualities.map((qRef) => qRef.id).includes(q.id)
                );
                let qualityText = "";
                if (qualities.length === 1)
                  qualityText +=
                    "is a desired quality of " + qualities[0].name + ")";
                else if (qualities.length > 1) {
                  qualityText += "(desires the qualities ";
                  for (let i = 0; i < qualities.length; i++) {
                    if (i === qualities.length - 1)
                      qualityText += " and " + qualities[i].name;
                    else if (i === 0) qualityText += qualities[i].name;
                    else qualityText += ", " + qualities[i].name;
                  }
                }

                console.log(qualities);
                return (
                  <ListItemButton
                    onClick={() => onClickHandler(element)}
                    key={uuidv4()}
                    selected={element.id === selectedIntentionalElement?.id}
                  >
                    <ListItemText
                      primary={element.name}
                      secondary={qualityText}
                    />
                  </ListItemButton>
                );
              })}
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
