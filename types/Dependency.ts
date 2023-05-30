import { IntentionalElementType } from "./intentionalElementType";

export default interface Dependency {
  id: string;
  name: string;
  type: IntentionalElementType;
  depender: string;
  dependerElement: string;
  dependee: string;
  dependeeElement: string;
}
