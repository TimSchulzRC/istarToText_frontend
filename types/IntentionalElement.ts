import ModelElement from "./ModelElement";
import { IntentionType } from "./intentionType";

export default interface IntentionalElement extends ModelElement {
  type: IntentionType;
  parent: string | null;
  childrenLinkType: "and" | "or" | null;
  children: IntentionalElement[];
  qualities: {
    id: string,
    type: string,
  }[];
  dependencies: string[];
}
