import Dependency from "./Dependency";
import ModelElement from "./ModelElement";
import Quality from "./Quality";
import {
  ConnectionType,
  IntentionalElementType,
} from "./intentionalElementType";
import { QualityType } from "./qualityType";

export default class IntentionalElement extends ModelElement {
  private _parentConnection?: ParentConnection;
  private _childrenConnectionType?: ConnectionType;
  private _children: IntentionalElement[] = [];
  private _qualities: { quality: Quality; relation: QualityType }[] = [];
  private _dependencies: Dependency[] = [];
  private _resources?: any[];

  constructor(
    id: string,
    name: string,
    private _type: IntentionalElementType.TASK | IntentionalElementType.GOAL
  ) {
    super(id, name);
  }

  public isTaskOrGoal() {
    return (
      this._type === IntentionalElementType.TASK ||
      this._type === IntentionalElementType.GOAL
    );
  }

  public addChild(child: IntentionalElement) {
    this._children.push(child);
  }

  public addChildren(...children: IntentionalElement[]) {
    this._children.push(...children);
  }

  get type() {
    return this._type;
  }

  get childrenConnectionType() {
    return this._childrenConnectionType;
  }
  set childrenConnectionType(connectionType: ConnectionType | undefined) {
    this._childrenConnectionType = connectionType;
  }

  get children() {
    return this._children;
  }

  get parentConnection() {
    return this._parentConnection;
  }
  set parentConnection(parentConnection: ParentConnection | undefined) {
    this._parentConnection = parentConnection;
  }

  get qualities() {
    return this._qualities;
  }

  public addQualityRelation(quality: Quality, relation: QualityType) {
    this._qualities.push({ quality, relation });
  }
  public addQualityRelations(
    ...qualities: { quality: Quality; relation: QualityType }[]
  ) {
    this._qualities.push(...qualities);
  }

  get dependencies() {
    return this._dependencies;
  }
  public addDependency(dependency: Dependency) {
    this._dependencies?.push(dependency);
  }
  public addDependencies(...dependencies: Dependency[]) {
    this._dependencies?.push(...dependencies);
  }
}

type ParentConnection = {
  parent: IntentionalElement;
  type: ConnectionType;
};
