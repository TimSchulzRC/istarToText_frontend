import Intention from "@/types/Intention";
import ModelElement from "@/types/ModelElement";
import { IntentionType } from "@/types/intentionType";
import { capitalizeFirstLetter, numberToText } from "@/util/StringUtil";
import { Box, Chip } from "@mui/material";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SelectedIntentionDispatchContext } from "./context/SelectedIntentionContext";
import { SelectedActorContext } from "./context/SelectedActorContext";
import Link from "next/link";
import LinkHoverChip from "./LinkHoverChip";

export default function IeListTextPhrase({
  elements,
  type,
  typePlural,
}: {
  elements: Intention[];
  type: IntentionType;
  typePlural: string;
}) {
  const setSelectedIntentionalElement = useContext(
    SelectedIntentionDispatchContext
  );
  const selectedActor = useContext(SelectedActorContext);
  const elementsCount = elements.length;
  return (
    <>
      <strong>
        {elementsCount !== 0 && numberToText(elementsCount)}{" "}
        {elementsCount === 1 ? capitalizeFirstLetter(type) : typePlural}
      </strong>
      {": "}
      {elements.map((element, index) => (
        <span key={uuidv4()}>
          {elementIsLast(index) && !elementIsFirst(index) && " and "}
          <LinkHoverChip
            label={element.name}
            element={element}
            color={getElementColor()}
          />

          {elementIsNotFirstOrLast(index) && ", "}
        </span>
      ))}
    </>
  );

  function getElementColor() {
    switch (type.toLowerCase()) {
      case "resource":
        return "primary";
      case "task":
        return "secondary";
      case "goal":
        return "warning";
      case "quality":
        return "success";
    }
  }

  function elementIsNotFirstOrLast(index: number) {
    return elementsCount > 1 && index >= 0 && index < elementsCount - 2;
  }

  function elementIsLast(index: number) {
    return index === elementsCount - 1;
  }

  function elementIsFirst(index: number) {
    return index === 0;
  }

  function updateSelectedIntention(intentionId: string) {
    setSelectedIntentionalElement(
      selectedActor.elements.find((e) => e.id === intentionId) as Intention
    );
  }
}
