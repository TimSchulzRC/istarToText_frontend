import React from "react";
import IeListTextPhrase from "./IeListTextPhrase";
import { v4 as uuidv4 } from "uuid";
import Actor from "@/types/Actor";
import { numberToText } from "@/util/StringUtil";
import { IntentionalElementType } from "@/types/intentionalElementType";

export default function IntentionsPhrase({ actor }: { actor: Actor }) {
  const { goalElements, taskElements, resourceElements, qualityElements } =
    splitElementsByType(actor.elements);
  const goalCount = goalElements.length;
  const taskCount = taskElements.length;
  const resourceCount = resourceElements.length;
  const qualityCount = qualityElements.length;

  return (
    <>
      {actor.name} has the{" "}
      {goalCount > 0 && (
        <IeListTextPhrase
          elements={goalElements}
          type={IntentionalElementType.GOAL}
          typePlural="Goals"
        />
      )}
      {taskCount > 0 && (
        <>
          {qualityCount === 0 && resourceCount === 0 ? " and " : ", "}
          <IeListTextPhrase
            elements={taskElements}
            type={IntentionalElementType.TASK}
            typePlural="Tasks"
          />
        </>
      )}
      {qualityCount > 0 && (
        <>
          {resourceCount === 0 ? " and " : ", "}
          <IeListTextPhrase
            elements={qualityElements}
            type={IntentionalElementType.QUALITY}
            typePlural="Qualities"
          />
        </>
      )}
      {resourceCount > 0 && (
        <>
          {" and "}
          <IeListTextPhrase
            elements={resourceElements}
            type={IntentionalElementType.RESOURCE}
            typePlural="Resources"
          />
        </>
      )}
      {"."}
    </>
  );
}

function splitElementsByType(elements: any[]) {
  const goalElements = elements.filter((element) => element.type === "goal");
  const taskElements = elements.filter((element) => element.type === "task");
  const resourceElements = elements.filter(
    (element) => element.type === "resource"
  );
  const qualityElements = elements.filter(
    (element) => element.type === "quality"
  );
  return {
    goalElements,
    taskElements,
    resourceElements,
    qualityElements,
  };
}
