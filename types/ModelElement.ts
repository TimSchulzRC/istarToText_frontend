/**
 * An interface representing a model element in the system, which is a basic building block of the model.
 *
 * @interface
 */
export default interface ModelElement {
  /**
   * A string representing the ID of the model element.
   */
  id: string;
  /**
   * A string representing the name of the model element.
   */
  name: string;
  /**
   * A string representing the type of the model element.
   */
  type: string;
}
