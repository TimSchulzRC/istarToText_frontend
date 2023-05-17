"use client";
import ActorCard from "@/components/ActorCard";
import ElevatedCard from "@/components/ElevatedCard";
import GoalCard from "@/components/GoalCard";
import ListCard from "@/components/ListCard";
import { ActorType } from "@/types/actorType";
import {
  ConnectionType,
  IntentionalElementType,
} from "@/types/intentionalElementType";
import { Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

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
                <ListCard title="Goals">
                  <ElevatedCard>
                    <CardContent>
                      <Typography variant="h6">
                        &quot;Student&quot; has 1 general goal:
                      </Typography>
                    </CardContent>
                  </ElevatedCard>
                  <GoalCard
                    intentionalElementType={IntentionalElementType.GOAL}
                    connectionType={ConnectionType.AND}
                  ></GoalCard>
                  <ElevatedCard>
                    <CardContent>
                      <Typography variant="h6">
                        &quot;Student&quot; has 8 other goals:
                      </Typography>
                    </CardContent>
                  </ElevatedCard>
                  <GoalCard
                    intentionalElementType={IntentionalElementType.GOAL}
                    connectionType={ConnectionType.OR}
                  ></GoalCard>
                </ListCard>
              </Grid>
              <Grid xs={1}>
                <ListCard title="Tasks">
                  <ActorCard actorType={ActorType.ROLE}></ActorCard>
                </ListCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
