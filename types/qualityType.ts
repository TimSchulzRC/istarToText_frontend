export enum QualityType {
  HELP = "help",
  HURT = "hurt",
  MAKE = "make",
  BREAK = "break",
  QUALIFY = "qualifies",
}

export function getQualityTypeDescription(qualityType: QualityType) {
  if (qualityType === QualityType.HELP)
    return " provides weak positive evidence for the satisfaction of the quality";
  if (qualityType === QualityType.HURT)
    return " provides weak evidence against the satisfaction of the quality";
  if (qualityType === QualityType.MAKE)
    return "provides sufficient positive evidence for the satisfaction of the quality";
  if (qualityType === QualityType.BREAK)
    return "provides sufficient  evidence against the satisfaction of the quality";
  if (qualityType === QualityType.QUALIFY)
    return "qualifies how the operation or function of this goal/task should be achieved";
}

export function getQualityTypeDescriptionPlural(qualityType: QualityType) {
  if (qualityType === QualityType.HELP)
    return " provides weak positive evidence for the satisfaction of the qualities";
  if (qualityType === QualityType.HURT)
    return " provides weak evidence against the satisfaction of the qualities";
  if (qualityType === QualityType.MAKE)
    return "provides sufficient positive evidence for the satisfaction of the qualities";
  if (qualityType === QualityType.BREAK)
    return "provides sufficient  evidence against the satisfaction of the qualities";
  if (qualityType === QualityType.QUALIFY)
    return "qualify how the operation or function of this goal/task should be achieved";
}