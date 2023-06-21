import Dependency from "@/types/Dependency";
import React, { createContext, useEffect } from "react";

export const DependenciesContext = createContext<Map<string, Dependency>>(
  new Map<string, Dependency>()
);

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
