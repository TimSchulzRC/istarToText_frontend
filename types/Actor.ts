import Intention from "./Intention";
import ModelElement from "./ModelElement";
import { ActorType } from "./actorType";

export default interface Actor extends ModelElement {
  description: string | null;
  elements: Intention[];
  type: ActorType;
  linksTo: { id: string; type: string }[];
  dependencies: string[];
}
