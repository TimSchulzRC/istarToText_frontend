"use client";
import ActorCard from "@/components/cards/ActorCard";
import ElevatedCard from "@/components/cards/ElevatedCard";
import IntentionalElementCard from "@/components/cards/IntentionalElementCard";
import ListCard from "@/components/cards/ListCard";
import IntentionalElement from "@/types/IntentionalElement";
import Quality from "@/types/Quality";
import { ActorType } from "@/types/actorType";
import {
  ConnectionType,
  IntentionalElementType,
} from "@/types/intentionalElementType";
import { QualityType } from "@/types/qualityType";
import { Card, CardContent, Container, Typography } from "@mui/material";
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
const intentionalElements: IntentionalElement[] = [e1, e2, e3, e4, t1];

export default function Home() {
  return (
    <main>
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={3}>
            <ListCard title="Actors">
              <ActorCard actorType={ActorType.ROLE}></ActorCard>
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
                    &quot;Student&quot; has 8 other goals:
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
                <ListCard title="Dependencies"></ListCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
