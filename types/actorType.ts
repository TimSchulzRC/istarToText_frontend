/**
 * An enumeration representing the type of an actor in the system.
 *
 * @enum {string}
 */
export enum ActorType {
  ACTOR = "actor",
  ROLE = "role",
  AGENT = "agent",
}

/**
 * A function that returns a description of the specified actor type.
 *
 * @param actorType - The type of the actor.
 * @returns A string describing the specified actor type.
 */
export function getActorTypeDescription(actorType: ActorType) {
  if (actorType === ActorType.ACTOR)
    return "generic actor without specialization";
  if (actorType === ActorType.ROLE)
    return "an abstract characterization of the behavior of a social actor within some specialized context or domain of endeavor";
  if (actorType === ActorType.AGENT)
    return "an actor with concrete, physical manifestations, such as a human individual, an organization, or a department";
}
