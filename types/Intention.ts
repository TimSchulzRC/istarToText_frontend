import ModelElement from "./ModelElement";
import { QualityDirection } from "./Quality";
import { IntentionType } from "./intentionType";
import { QualityType } from "./qualityType";

export default interface Intention extends ModelElement {
  type: IntentionType;
  parent: string | null;
  childrenLinkType: "and" | "or" | null;
  children: string[];
  qualities: {
    id: string,
    type: QualityType,
    direction: QualityDirection,
  }[];
  dependencies: string[];
}
