import Dependency from "@/types/Dependency";
import React, { createContext, useEffect } from "react";
/**
 * A context that provides a Map of dependencies, where the keys are the dependency IDs and the values are the dependency objects.
 * This context is used to share the dependencies data between components.
 */
export const DependenciesContext = createContext<Map<string, Dependency>>(
  new Map<string, Dependency>()
);

/**
 * A provider component that fetches a list of dependencies from a JSON file and stores them in a Map.
 * It provides the dependencies Map to its children components.
 *
 * @param children - The child components that will have access to the dependencies Map.
 */
export default function DependenciesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dependencies, setDependencies] = React.useState<
    Map<string, Dependency>
  >(new Map<string, Dependency>());

  useEffect(() => {
    const dependenciesMap = new Map<string, Dependency>();
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.actors);
        data.dependencies.forEach((dependency: Dependency) =>
          dependenciesMap.set(dependency.id, dependency as Dependency)
        );
        setDependencies(dependenciesMap);
      });
  }, []);

  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}
