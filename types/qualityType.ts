export enum QualityType {
  HELP = "help",
  HURT = "hurt",
  MAKE = "make",
  BREAK = "break",
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
}
