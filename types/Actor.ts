import IntentionalElement from "./IntentionalElement";
import ModelElement from "./ModelElement";
import { ActorType } from "./actorType";

export default interface Actor extends ModelElement {
  description: string | null;
  elements: IntentionalElement[];
  type: ActorType;
  linksTo: { id: string; type: string }[];
  dependencies: string[];
}
