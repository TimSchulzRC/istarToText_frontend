import IntentionalElement from "@/types/IntentionalElement";
import ModelElement from "@/types/ModelElement";
import { IntentionalElementType } from "@/types/intentionalElementType";
import { capitalizeFirstLetter, numberToText } from "@/util/StringUtil";
import { Chip } from "@mui/material";
import React from "react";

export default function IeListTextPhrase({
  elements,
  type,
  typePlural,
}: {
  elements: IntentionalElement[];
  type: IntentionalElementType;
  typePlural: string;
}) {
  const elementsCount = elements.length;
  return (
    <>
      <strong>{elementsCount !== 0 && numberToText(elementsCount)}</strong>{" "}
      {elementsCount === 1 ? capitalizeFirstLetter(type) : typePlural}
      {": "}
      {elements.map((element, index) => (
        <>
          {elementIsLast(index) && !elementIsFirst(index) && " and "}
          <Chip
            onClick={() => {}}
            component="span"
            label={element.name}
            size="small"
            color={getElementColor()}
          />
          {elementIsNotFirstOrLast(index) && ", "}
        </>
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
        return "default";
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
}
