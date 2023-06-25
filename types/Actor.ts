import Intention from "./Intention";
import ModelElement from "./ModelElement";
import { ActorType } from "./actorType";

/**
 * An interface representing an actor in the system, which is a model element that can have intentional elements, dependencies, and links to other model elements.
 *
 * @interface
 * @extends ModelElement
 */
export default interface Actor extends ModelElement {
  /**
   * A string representing the description of the actor.
   */
  description: string | null;
  /**
   * An array of intentional elements associated with the actor.
   */
  elements: Intention[];
  /**
   * A string representing the type of the actor.
   */
  type: ActorType;
  /**
   * An array of objects representing the links to other model elements.
   */
  linksTo: { id: string; type: string }[];
  /**
   * An array of strings representing the dependencies of the actor.
   */
  dependencies: string[];
}
