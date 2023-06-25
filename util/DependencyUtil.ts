import Actor from "@/types/Actor";
import Dependency from "@/types/Dependency";
import { IntentionType } from "@/types/intentionType";

/**
 * A function that combines dependencies by depender and returns an array of objects representing the combined dependencies.
 *
 * @param dependencies - An array of dependencies to be combined.
 * @param actors - A map of actors in the system.
 * @returns An array of objects representing the combined dependencies.
 */
export function combineDependenciesByDepender(
  dependencies: Dependency[],
  actors: Map<string, Actor>
) {
  const combinedDependencies: Map<
    string,
    {
      id: string;
      actorName: string;
      dependencies: { name: string; type: IntentionType }[];
    }
  > = new Map();
  dependencies.forEach((d) => {
    if (!combinedDependencies.get(d.depender)) {
      combinedDependencies.set(d.depender, {
        id: d.depender,
        actorName: actors.get(d.depender)?.name || "",
        dependencies: [{ name: d.name, type: d.type }],
      });
    } else {
      combinedDependencies.get(d.depender)?.dependencies.push({
        name: d.name,
        type: d.type,
      });
    }
  });

  return Array.from(combinedDependencies.values());
}

/**
 * A function that returns an array of required dependencies for the specified actor, given an array of dependency IDs and a map of dependencies.
 *
 * @param dependencyIDs - An array of dependency IDs.
 * @param dependencies - A map of dependencies.
 * @param actor - The actor for which to retrieve the required dependencies.
 * @returns An array of required dependencies for the specified actor.
 */
export function getRequiredDependencies(
  dependencyIDs: string[],
  dependencies: Map<string, Dependency>,
  actor: Actor
) {
  return dependencyIDs
    .filter((e) => dependencies.get(e)?.dependee !== actor.id)
    .map((e) => dependencies.get(e)) as Dependency[];
}

/**
 * A function that returns an array of requiring dependencies for the specified actor, given an array of dependency IDs and a map of dependencies.
 *
 * @param dependencyIDs - An array of dependency IDs.
 * @param dependencies - A map of dependencies.
 * @param actor - The actor for which to retrieve the requiring dependencies.
 * @returns An array of requiring dependencies for the specified actor.
 */
export function getRequiringDependencies(
  dependencyIDs: string[],
  dependencies: Map<string, Dependency>,
  actor: Actor
) {
  return dependencyIDs
    .filter((e) => dependencies.get(e)?.dependee === actor.id)
    .map((e) => dependencies.get(e)) as Dependency[];
}

/**
 * A function that combines dependencies by dependee and returns an array of objects representing the combined dependencies.
 *
 * @param dependencies - An array of dependencies to be combined.
 * @param actors - A map of actors in the system.
 * @returns An array of objects representing the combined dependencies.
 */
export function combineDependenciesByDependee(
  dependencies: Dependency[],
  actors: Map<string, Actor>
) {
  const combinedDependencies: Map<
    string,
    {
      id: string;
      actorName: string;
      dependencies: { name: string; type: IntentionType }[];
    }
  > = new Map();
  dependencies?.forEach((d) => {
    if (!d?.dependee) return;
    if (!combinedDependencies.get(d.dependee)) {
      combinedDependencies.set(d.dependee, {
        id: d.dependee,
        actorName: actors.get(d.dependee)?.name || "",
        dependencies: [{ name: d.name, type: d.type }],
      });
    } else {
      combinedDependencies.get(d.dependee)?.dependencies.push({
        name: d.name,
        type: d.type,
      });
    }
  });

  return Array.from(combinedDependencies.values());
}
