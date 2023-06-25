import Actor from "@/types/Actor";
import { IntentionType } from "@/types/intentionType";
import IeListTextPhrase from "./IeListTextPhrase";

/**
 * A component that displays a phrase summarizing the intentional elements of a specified actor, including goals, tasks, resources, and qualities.
 *
 * @param actor - The actor whose intentional elements to summarize.
 * @returns A JSX element that displays a phrase summarizing the intentional elements of a specified actor, including goals, tasks, resources, and qualities.
 */
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
      {/* {"."} */}
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

/**
 * A function that splits an array of intentional elements into separate arrays by type.
 *
 * @param elements - The array of intentional elements to split.
 * @returns An object containing separate arrays of intentional elements by type.
 */
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
