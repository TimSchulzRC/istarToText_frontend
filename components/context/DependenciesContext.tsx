import React, { createContext, useEffect } from "react";
import data from "@/resources/trustcomputingSR-2.json";
import Dependency from "@/types/Dependency";

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
    data.dependencies.forEach((dependency) =>
      dependenciesMap.set(dependency.id, dependency as Dependency)
    );
    setDependencies(dependenciesMap);
  }, []);

  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}
