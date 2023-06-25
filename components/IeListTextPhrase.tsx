import Intention from "@/types/Intention";
import { IntentionType } from "@/types/intentionType";
import { getChipColor } from "@/util/DisplayUtil";
import { capitalizeFirstLetter, numberToText } from "@/util/StringUtil";
import { v4 as uuidv4 } from "uuid";
import LinkHoverChip from "./LinkHoverChip";

/**
 * A component that displays a list of intentional elements of a specified type, along with the number of elements and the plural form of the type.
 *
 * @param elements - The list of intentional elements to display.
 * @param type - The type of the intentional elements to display.
 * @param typePlural - The plural form of the type of the intentional elements to display.
 * @returns A JSX element that displays a list of intentional elements of a specified type, along with the number of elements and the plural form of the type.
 */
export default function IeListTextPhrase({
  elements,
  type,
  typePlural,
}: {
  elements: Intention[];
  type: IntentionType;
  typePlural: string;
}) {
  const elementsCount = elements.length;
  return (
    <>
      <strong>
        {elementsCount !== 0 && numberToText(elementsCount)}{" "}
        {elementsCount === 1 ? capitalizeFirstLetter(type) : typePlural}
      </strong>
      {": "}
      <ul style={{ paddingLeft: 20 }}>
        {elements.map((element, index) => (
          <li key={uuidv4()}>
            <LinkHoverChip
              label={element.name}
              element={element}
              color={getChipColor(type)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
