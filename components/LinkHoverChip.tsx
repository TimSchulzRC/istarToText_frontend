import Actor from "@/types/Actor";
import Intention from "@/types/Intention";
import { ActorType } from "@/types/actorType";
import { IntentionType } from "@/types/intentionType";
import { Chip, Paper, Popper } from "@mui/material";
import React from "react";
import DetailsScreen from "./DetailsScreen";
import {
  DecrementHoverDepthContext,
  HoverDepthContext,
  IncrementHoverDepthContext,
} from "./context/HoverDepthContext";
import { SelectedActorDispatchContext } from "./context/SelectedActorContext";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";

/**
 * A component that displays a clickable chip with a label and an optional color.
 * When hovered over, it displays an overlay with additional details about the element.
 * When clicked, it selects the element and displays its details in a separate screen.
 *
 * @param label - The label to display on the chip.
 * @param color - The color of the chip. Can be one of "default", "warning", "primary", "secondary", "error", "info", or "success".
 * @param element - The element to display details for when the chip is clicked or hovered over.
 */
export default function LinkHoverChip({
  label,
  color,
  element,
}: {
  label: string | undefined;
  color?:
    | "default"
    | "warning"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success";
  element?: Intention | Actor;
}) {
  const setSelectedActor = React.useContext(SelectedActorDispatchContext);
  const setSelectedIntention = React.useContext(
    SelectedIntentionDispatchContext
  );
  const hoverDepth = React.useContext(HoverDepthContext);
  const incrementHoverDepth = React.useContext(IncrementHoverDepthContext);
  const decrementHoverDepth = React.useContext(DecrementHoverDepthContext);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [delayHandler, setDelayHandler] = React.useState<null | NodeJS.Timeout>(
    null
  );
  return (
    <>
      <Chip
        component="span"
        label={label}
        color={color}
        size="small"
        onMouseEnter={(event) => {
          clearTimeout(delayHandler as NodeJS.Timeout);
          setDelayHandler(setTimeout(() => setShowOverlay(true), 500));
        }}
        onMouseLeave={(event) => {
          clearTimeout(delayHandler as NodeJS.Timeout);
          // setDelayHandler(setTimeout(() => setShowOverlay(false), 500));
        }}
        onClick={() => {
          console.log(element);
          if (elementIsActor(element)) {
            setSelectedActor(element as Actor);
          }
          if (elementIsIntention(element)) {
            setSelectedIntention(element as Intention);
          }
        }}
      />
      <Popper
        sx={{ mt: (hoverDepth?.current || 1) * 10, width: "50vw" }}
        open={showOverlay}
        onMouseEnter={(event) => {
          clearTimeout(delayHandler as NodeJS.Timeout);
          incrementHoverDepth();
          console.log(hoverDepth);
          setShowOverlay(true);
        }}
        onMouseLeave={(event) => {
          clearTimeout(delayHandler as NodeJS.Timeout);
          decrementHoverDepth();
          setShowOverlay(false);
        }}
      >
        <Paper elevation={10}>
          {elementIsActor(element) && (
            <DetailsScreen actor={element as Actor} />
          )}
          {elementIsIntention(element) && (
            <DetailsScreen intention={element as Intention} />
          )}
        </Paper>
      </Popper>
    </>
  );
}

/**
 * Returns true if the element is an Actor or Intention, false otherwise.
 *
 * @param element The element to check.
 * @returns True if the element is an Actor or Intention, false otherwise.
 */
function elementIsActor(element: Intention | Actor | undefined): boolean {
  return Object.values(ActorType).includes(element?.type as ActorType);
}

/**
 * Checks if an element is an instance of the Intention class.
 * @param element The element to check.
 * @returns True if the element is an instance of the Intention class, false otherwise.
 */
function elementIsIntention(element: Intention | Actor | undefined): boolean {
  return Object.values(IntentionType).includes(element?.type as IntentionType);
}
