"use client";
import ActorsList from "@/components/ActorsList";
import DetailsScreen from "@/components/DetailsScreen";
import IntentionsList from "@/components/IntentionsList";
import ActorsProvider from "@/components/context/ActorsContext";
import DependenciesProvider from "@/components/context/DependenciesContext";
import SelectedIntentionProvider from "@/components/context/SelectedIntentionContext";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function Home() {
  return (
    <main>
      <DependenciesProvider>
        <ActorsProvider>
          <SelectedIntentionProvider>
            <Container maxWidth="xl" sx={{ height: "100vh" }}>
              <Grid container sx={{ height: "100vh" }}>
                <Grid xs={12} md={3}>
                  <ActorsList />
                </Grid>
                <Grid xs={12} md={3}>
                  <IntentionsList />
                </Grid>
                <Grid xs={12} md={6}>
                  <DetailsScreen />
                </Grid>
              </Grid>
            </Container>
          </SelectedIntentionProvider>
        </ActorsProvider>
      </DependenciesProvider>
    </main>
  );
}
