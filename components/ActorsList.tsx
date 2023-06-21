import React from "react";
import ActorListItem from "./ActorListItem";
import ListCard from "./cards/ListCard";
import { ActorsContext } from "./context/ActorsContext";

export default function ActorsList() {
  const actors = React.useContext(ActorsContext);
  return (
    <ListCard title="Actors">
      {Array.from(actors).map(([id, actor]) => {
        return <ActorListItem key={id} actor={actor} />;
      })}
    </ListCard>
  );
}
