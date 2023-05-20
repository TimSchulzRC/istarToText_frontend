import Actor from "./Actor";
import IntentionalElement from "./IntentionalElement";
import ModelElement from "./ModelElement";
import { IntentionalElementType } from "./intentionalElementType";

export default class Dependency extends ModelElement {
  constructor(
    id: string,
    name: string,
    private _type: IntentionalElementType,
    private _direction: DependencyDirection,
    private _otherActor: Actor,
    private _otherElement: IntentionalElement,
    private _ownElement: IntentionalElement
  ) {
    super(id, name);
  }
  get type() {
    return this._type;
  }
  get ownElement() {
    return this._ownElement;
  }
  get otherActor() {
    return this._otherActor;
  }
  get otherElement() {
    return this._otherElement;
  }
}

type DependencyDirection = "outgoing" | "incoming";
