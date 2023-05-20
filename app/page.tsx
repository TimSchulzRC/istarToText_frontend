"use client";
import ActorCard from "@/components/cards/ActorCard";
import DependencyCard from "@/components/cards/DependencyCard";
import IntentionalElementCard from "@/components/cards/IntentionalElementCard";
import ListCard from "@/components/cards/ListCard";
import Actor from "@/types/Actor";
import Dependency from "@/types/Dependency";
import IntentionalElement from "@/types/IntentionalElement";
import Quality from "@/types/Quality";
import { ActorType } from "@/types/actorType";
import {
  ConnectionType,
  IntentionalElementType,
} from "@/types/intentionalElementType";
import { QualityType } from "@/types/qualityType";
import { Card, CardContent, Chip, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const e1 = new IntentionalElement(
  "1",
  "Travel organized",
  IntentionalElementType.GOAL
);
e1.childrenConnectionType = ConnectionType.AND;
const e2 = new IntentionalElement(
  "2",
  "Authorization obtained",
  IntentionalElementType.GOAL
);
e2.parentConnection = { parent: e1, type: ConnectionType.AND };
e2.childrenConnectionType = ConnectionType.AND;

const e3 = new IntentionalElement(
  "3",
  "Trip booked",
  IntentionalElementType.GOAL
);
e3.parentConnection = { parent: e1, type: ConnectionType.AND };
e1.addChildren(e2, e3);

const e4 = new IntentionalElement(
  "4",
  "Request prepared",
  IntentionalElementType.GOAL
);
e4.childrenConnectionType = ConnectionType.OR;
e4.parentConnection = { parent: e2, type: ConnectionType.AND };
e2.addChild(e4);

const t1 = new IntentionalElement(
  "t1",
  "Fill in paper form",
  IntentionalElementType.TASK
);
t1.parentConnection = { parent: e4, type: ConnectionType.OR };
e4.addChild(t1);
const q1 = new Quality("1", "No Errors");
t1.addQualityRelation(q1, QualityType.HURT);

const t2 = new IntentionalElement(
  "t2 ",
  "Fill in online form",
  IntentionalElementType.TASK
);
t2.parentConnection = { parent: e4, type: ConnectionType.OR };
e4.addChild(t2);

const e5 = new IntentionalElement(
  "e5",
  "Process form",
  IntentionalElementType.TASK
);

const intentionalElements: IntentionalElement[] = [e1, e2, e3, e4, t1, t2];

const travelAgency = new Actor("1", "Univ. trip mgmt IS");
const d1 = new Dependency(
  "1",
  "Online form processed",
  IntentionalElementType.GOAL,
  "outgoing",
  travelAgency,
  e5,
  t2
);
t2.addDependency(d1);

export default function Home() {
  return (
    <main>
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={3}>
            <ListCard title="Actors">
              <ActorCard name="Student" actorType={ActorType.ROLE}></ActorCard>
            </ListCard>
          </Grid>
          <Grid xs={12} md={9}>
            <Grid container columns={2} spacing={2}>
              <Grid xs={2}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h2">Student</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={1}>
                <ListCard title="Goals and Tasks">
                  <Typography variant="h6">
                    &quot;Student&quot; has 1 general goal:
                  </Typography>
                  {intentionalElements.map(
                    (e, index) =>
                      e.parentConnection === undefined && (
                        <IntentionalElementCard
                          key={index}
                          element={e}
                        ></IntentionalElementCard>
                      )
                  )}
                  <Typography variant="h6" sx={{ pt: 4 }}>
                    &quot;Student&quot; has 5 other goals / tasks:
                  </Typography>

                  {intentionalElements.map(
                    (e, index) =>
                      e.parentConnection && (
                        <IntentionalElementCard
                          key={index}
                          element={e}
                        ></IntentionalElementCard>
                      )
                  )}
                </ListCard>
              </Grid>
              <Grid xs={1}>
                <ListCard title="Dependencies">
                  <Typography variant="body1">
                    &quot;Student&quot; depends on 2 other actors:{" "}
                    <Chip label="Travel Agency" /> and{" "}
                    <Chip label="Univ. trip mgmt IS" />
                  </Typography>
                  <DependencyCard dependency={d1} />
                </ListCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
