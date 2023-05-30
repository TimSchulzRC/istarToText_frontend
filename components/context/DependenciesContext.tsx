import React, { createContext, useEffect } from "react";
import test from "@/resources/test.json";
import Dependency from "@/types/Dependency";
import { IntentionalElementType } from "@/types/intentionalElementType";

export const DependenciesContext = createContext<Dependency[]>([]);

export default function DependenciesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dependencies, setDependencies] = React.useState<Dependency[]>([]);
  const effectRan = React.useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      test.dependencies.forEach((dependency) => {
        setDependencies((prev) => [
          ...prev,
          {
            id: dependency.id,
            name: dependency.name,
            type: dependency.type as IntentionalElementType,
            depender: dependency.depender,
            dependeeElement: dependency.dependeeElement,
            dependerElement: dependency.dependerElement,
            dependee: dependency.dependee,
          },
        ]);
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, []);
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}
