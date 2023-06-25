import { QualityDirection } from "./Quality";

/**
 * An enumeration representing the type of quality associated with an intentional element in the system.
 *
 * @enum {string}
 */
export enum QualityType {
  HELP = "help",
  HURT = "hurt",
  MAKE = "make",
  BREAK = "break",
  QUALIFY = "qualifies",
}

/**
 * A function that returns a description of the specified quality type.
 *
 * @param qualityType - The type of the quality.
 * @param isPlural - A boolean indicating whether the description should be pluralized.
 * @param direction - A string representing the direction of the quality, which can be incoming, outgoing, or both.
 * @returns A string describing the specified quality type.
 */
export function getQualityTypeDescription(
  qualityType: QualityType,
  isPlural: boolean = false,
  direction: QualityDirection = "outgoing"
) {
  if (isPlural) return getQualityTypeDescriptionPlural(qualityType);
  if (direction === "incoming")
    return getQualityTypeDescriptionIncoming(qualityType);
  if (qualityType === QualityType.HELP)
    return " somewhat supports achieving the quality";
  if (qualityType === QualityType.HURT)
    return " somewhat goes against achieving the quality";
  if (qualityType === QualityType.MAKE)
    return "strongly supports achieving the quality";
  if (qualityType === QualityType.BREAK)
    return "strongly goes against achieving the quality";
  if (qualityType === QualityType.QUALIFY)
    return "qualifies how the operation or function of this goal/task should be achieved";
}

/**
 * A function that returns a pluralized description of the specified quality type.
 *
 * @param qualityType - The type of the quality.
 * @returns A string describing the specified quality type in plural form.
 */
function getQualityTypeDescriptionPlural(qualityType: QualityType) {
  if (qualityType === QualityType.HELP)
    return " somewhat supports achieving the qualities";
  if (qualityType === QualityType.HURT)
    return " somewhat goes against achieving the qualities";
  if (qualityType === QualityType.MAKE)
    return "strongly supports achieving the qualities";
  if (qualityType === QualityType.BREAK)
    return "strongly goes against achieving the qualities";
  if (qualityType === QualityType.QUALIFY)
    return "qualify how the operation or function of these goals/tasks should be achieved";
}

/**
 * A function that returns a description of the specified quality type in the incoming direction.
 *
 * @param qualityType - The type of the quality.
 * @returns A string describing the specified quality type in the incoming direction.
 */
function getQualityTypeDescriptionIncoming(qualityType: QualityType) {
  if (qualityType === QualityType.HELP) return " gets weak satisfaction from ";
  if (qualityType === QualityType.HURT)
    return " gets weak negative satisfaction from ";
  if (qualityType === QualityType.MAKE)
    return " gets sufficient satisfaction from ";
  if (qualityType === QualityType.BREAK)
    return " gets sufficient negative satisfaction from ";
}
