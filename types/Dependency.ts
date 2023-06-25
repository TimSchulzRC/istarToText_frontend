import { IntentionType } from "./intentionType";

/**
 * An interface representing a dependency between two intentional elements in the system.
 *
 * @interface
 */
export default interface Dependency {
  /**
   * A string representing the ID of the dependency.
   */
  id: string;
  /**
   * A string representing the name of the dependency.
   */
  name: string;
  /**
   * An enumeration representing the type of the intentional element that the dependency is associated with.
   */
  type: IntentionType;
  /**
   * A string representing the ID of the intentional element that depends on the other intentional element.
   */
  depender: string;
  /**
   * A string representing the ID of the element within the depender intentional element that the dependency is associated with.
   */
  dependerElement: string;
  /**
   * A string representing the ID of the intentional element that the depender intentional element depends on.
   */
  dependee: string;
  /**
   * A string representing the ID of the element within the dependee intentional element that the dependency is associated with.
   */
  dependeeElement: string;
}
