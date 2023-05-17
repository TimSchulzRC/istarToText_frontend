export enum ActorType {
  ACTOR = "Actor",
  ROLE = "Role",
  AGENT = "Agent",
}

const actorTypeDescriptions = {
  actor: "generic actor without specialization",
  role: "an abstract characterization of the behavior of a social actor within some specialized context or domain of endeavor",
  agent:
    "an actor with concrete, physical manifestations, such as a human indi- vidual, an organization, or a department",
};

export function getActorTypeDescription(actorType: ActorType) {
  if (actorType === ActorType.ACTOR) return actorTypeDescriptions.actor;
  if (actorType === ActorType.ROLE) return actorTypeDescriptions.role;
  if (actorType === ActorType.AGENT) return actorTypeDescriptions.agent;
}
