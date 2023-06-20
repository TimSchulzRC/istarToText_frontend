import { QualityDirection } from "./Quality";

export enum QualityType {
  HELP = "help",
  HURT = "hurt",
  MAKE = "make",
  BREAK = "break",
  QUALIFY = "qualifies",
}

export function getQualityTypeDescription(qualityType: QualityType, isPlural: boolean = false, direction: QualityDirection = "outgoing") {
  if(isPlural) return getQualityTypeDescriptionPlural(qualityType);
  if(direction === "incoming") return getQualityTypeDescriptionIncoming(qualityType);
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
    return "qualify how the operation or function of this goal/task should be achieved";
}

function getQualityTypeDescriptionIncoming(qualityType: QualityType) {
  if (qualityType === QualityType.HELP)
    return " gets weak satisfaction from ";
  if (qualityType === QualityType.HURT)
    return " gets weak negative satisfaction from ";
  if (qualityType === QualityType.MAKE)
    return " gets sufficient satisfaction from ";
  if (qualityType === QualityType.BREAK)
    return " gets sufficient negative satisfaction from ";
}