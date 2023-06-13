import React from "react";
import IeListTextPhrase from "./IeListTextPhrase";
import { v4 as uuidv4 } from "uuid";
import Actor from "@/types/Actor";
import { numberToText } from "@/util/StringUtil";
import { IntentionType } from "@/types/intentionType";

export default function IntentionsPhrase({ actor }: { actor: Actor }) {
  const { goalElements, taskElements, resourceElements, qualityElements } =
    splitElementsByType(actor.elements);
  const goalCount = goalElements.length;
  const taskCount = taskElements.length;
  const resourceCount = resourceElements.length;
  const qualityCount = qualityElements.length;

  return (
    <>
      <br />
      <strong>{actor.name}</strong> has the{" "}
      {goalCount > 0 && (
        <IeListTextPhrase
          elements={goalElements}
          type={IntentionType.GOAL}
          typePlural="Goals"
        />
      )}
      {taskCount > 0 && (
        <>
          {goalCount > 0 && " and "}
          <IeListTextPhrase
            elements={taskElements}
            type={IntentionType.TASK}
            typePlural="Tasks"
          />
        </>
      )}
      {"."}
      {resourceCount > 0 && (
        <>
          <br />
          <strong>{actor.name}</strong> needs the{" "}
          <IeListTextPhrase
            elements={resourceElements}
            type={IntentionType.RESOURCE}
            typePlural="Resources"
          />
        </>
      )}
      {qualityCount > 0 && (
        <>
          <br />
          <br />
          <strong>{actor.name}</strong> also wants to ensure{" "}
          <IeListTextPhrase
            elements={qualityElements}
            type={IntentionType.QUALITY}
            typePlural="Qualities"
          />
        </>
      )}
      <br />
    </>
  );
}

function splitElementsByType(elements: any[]) {
  const goalElements = elements.filter(
    (element) => element.type === IntentionType.GOAL
  );
  const taskElements = elements.filter(
    (element) => element.type === IntentionType.TASK
  );
  const resourceElements = elements.filter(
    (element) => element.type === IntentionType.RESOURCE
  );
  const qualityElements = elements.filter(
    (element) => element.type === IntentionType.QUALITY
  );
  return {
    goalElements,
    taskElements,
    resourceElements,
    qualityElements,
  };
}
