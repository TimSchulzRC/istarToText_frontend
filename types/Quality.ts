import Intention from "./Intention";
import { QualityType } from "./qualityType";

/**
 * An interface representing a quality associated with an intentional element in the system.
 *
 * @interface
 * @extends Intention
 */
export default interface Quality extends Intention {
  /**
   * An enumeration representing the type of the quality.
   */
  qualityType: QualityType;
  /**
   * A string representing the direction of the quality, which can be incoming, outgoing, or both.
   */
  direction: QualityDirection;
}

/**
 * A type representing the direction of a quality associated with an intentional element in the system.
 *
 * @typedef {string} QualityDirection
 * @enum {string}
 * @property {string} INCOMING - The quality is incoming, meaning that it is associated with the intentional element that depends on the other intentional element.
 * @property {string} OUTGOING - The quality is outgoing, meaning that it is associated with the intentional element that the depender intentional element depends on.
 * @property {string} BOTH - The quality is related to another element in the sense of describing it further.
 */
export type QualityDirection = "incoming" | "outgoing" | "both";
