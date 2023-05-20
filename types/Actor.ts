import Dependency from "./Dependency";
import IntentionalElement from "./IntentionalElement";
import ModelElement from "./ModelElement";

export default class Actor extends ModelElement {
  private _elements: IntentionalElement[] = [];
  private _dependencies: Dependency[] = [];
}
