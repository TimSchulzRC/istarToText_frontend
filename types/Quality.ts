import Intention from "./Intention";
import { QualityType } from "./qualityType";

export default interface Quality extends Intention {
     qualityType: QualityType;
     direction: QualityDirection
}

export type QualityDirection = "incoming" | "outgoing" | "both";