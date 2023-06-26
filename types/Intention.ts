import Actor from "./Actor";
import ModelElement from "./ModelElement";
import { QualityDirection } from "./Quality";
import { IntentionType } from "./intentionType";
import { QualityType } from "./qualityType";

/**
 * An interface representing an intentional element in the system, which is a model element that can have qualities, dependencies, and links to other model elements.
 *
 * @interface
 * @extends ModelElement
 */
export default interface Intention extends ModelElement {
  /**
   * An enumeration representing the type of the intentional element.
   */
  type: IntentionType;
  /**
   * A string representing the ID of the parent intentional element.
   */
  parent: string | null;
  /**
   * A string representing the type of the link between the children intentional elements.
   */
  childrenLinkType: "and" | "or" | null;
  /**
   * An array of strings representing the IDs of the children intentional elements.
   */
  children: string[];
  /**
   * An array of objects representing the qualities associated with the intentional element.
   */
  qualities: {
    id: string;
    type: QualityType;
    direction: QualityDirection;
  }[];
  /**
   * An array of strings representing the IDs of the dependencies associated with the intentional element.
   */
  dependencies: string[];
  /**
   * The actor the intentional element is associated with.
   */
  actor: Actor;
}
