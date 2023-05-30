import ModelElement from "./ModelElement";
import { IntentionalElementType } from "./intentionalElementType";

export default interface IntentionalElement extends ModelElement {
  type: IntentionalElementType;
}
