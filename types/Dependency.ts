import { IntentionType } from "./intentionType";

export default interface Dependency {
  id: string;
  name: string;
  type: IntentionType;
  depender: string;
  dependerElement: string;
  dependee: string;
  dependeeElement: string;
}
