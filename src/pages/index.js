import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Mlcategory } from "../components/dashboard/mlcategory";
import { Sales } from "../components/dashboard/sales";
import { Sector2 } from "../components/dashboard/sector2";
import { Sector1 } from "../components/dashboard/sector1";
import { Sector3 } from "../components/dashboard/sector3";

import { DashboardLayout } from "../components/dashboard-layout";
// import { LatestOrders } from '../components/dashboard/latest-orders';
// import { LatestProducts } from '../components/dashboard/latest-products';
// import { TrafficByDevice } from '../components/dashboard/traffic-by-device';

const Dashboard = () => (
  <>
    <Head>
      <title>Dashboard | HISEOUL ML CONSOLE</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Mlcategory />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Sector1 />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Sector2 />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Sector3 sx={{ height: "100%" }} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            // 3
            xs={12}
          >
            <Sales />
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            // 3
            xs={12}
          >
            <Sales />
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            // 3
            xs={12}
          >
            <Sales />
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            // 3
            xs={12}
          >
            <Sales />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
