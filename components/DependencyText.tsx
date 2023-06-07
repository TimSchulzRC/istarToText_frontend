import Dependency from "@/types/Dependency";
import { IntentionType } from "@/types/intentionType";
import { Chip } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function DependencyText({
  dependency: d,
}: {
  dependency: { type: IntentionType; name: string };
}) {
  return (
    <>
      {" "}
      {d.type === IntentionType.GOAL && (
        <>
          {" "}
          achieve{" "}
          <Chip
            size="small"
            key={uuidv4()}
            component="span"
            label={d.name}
            color="warning"
          />
        </>
      )}
      {d.type === IntentionType.TASK && (
        <>
          {" "}
          complete{" "}
          <Chip
            size="small"
            key={uuidv4()}
            component="span"
            label={d.name}
            color="secondary"
          />
        </>
      )}
      {d.type === IntentionType.QUALITY && (
        <>
          {" "}
          ensure{" "}
          <Chip
            size="small"
            key={uuidv4()}
            component="span"
            label={d.name}
            color="success"
          />
        </>
      )}
      {d.type === IntentionType.RESOURCE && (
        <>
          {" "}
          provide{" "}
          <Chip
            size="small"
            key={uuidv4()}
            component="span"
            label={d.name}
            color="primary"
          />
        </>
      )}
    </>
  );
}
