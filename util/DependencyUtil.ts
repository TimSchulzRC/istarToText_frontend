import Actor from "@/types/Actor";
import Dependency from "@/types/Dependency";
import { IntentionType } from "@/types/intentionType";

export function combineDependenciesByDepender(dependencies: Dependency[], actors: Map<string, Actor>) {
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

export function getRequiredDependencies(dependencyIDs: string[], dependencies: Map<string, Dependency>, actor: Actor) {
    return dependencyIDs
      .filter((e) => dependencies.get(e)?.dependee !== actor.id)
      .map((e) => dependencies.get(e)) as Dependency[];
  }

export function getRequiringDependencies(dependencyIDs: string[],dependencies: Map<string, Dependency>, actor: Actor) {
    return dependencyIDs
      .filter((e) => dependencies.get(e)?.dependee === actor.id)
      .map((e) => dependencies.get(e)) as Dependency[];
}

export 
function combineDependenciesByDependee(dependencies: Dependency[], actors: Map<string, Actor>) {
  const combinedDependencies: Map<
    string,
    {
      id: string;
      actorName: string;
      dependencies: { name: string; type: IntentionType }[];
    }
  > = new Map();
  dependencies.forEach((d) => {
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