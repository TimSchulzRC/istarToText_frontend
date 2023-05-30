"use client";
import ActorsList from "@/components/ActorsList";
import DetailsScreen from "@/components/DetailsScreen";
import IntentionalElementsList from "@/components/IntentionalElementsList";
import ActorsProvider from "@/components/context/ActorsContext";
import DependenciesProvider from "@/components/context/DependenciesContext";
import SelectedIntentionalElementProvider from "@/components/context/SelectedIntentionalElementContext";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function Home() {
  return (
    <main>
      <DependenciesProvider>
        <ActorsProvider>
          <SelectedIntentionalElementProvider>
            <Container maxWidth="xl" sx={{ height: "100vh" }}>
              <Grid container sx={{ height: "100vh" }}>
                <Grid xs={12} md={3}>
                  <ActorsList />
                </Grid>
                <Grid xs={12} md={3}>
                  <IntentionalElementsList />
                </Grid>
                <Grid xs={12} md={6}>
                  <DetailsScreen />
                </Grid>
              </Grid>
            </Container>
          </SelectedIntentionalElementProvider>
        </ActorsProvider>
      </DependenciesProvider>
    </main>
  );
}
