import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const Sector2 = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            SECTOR 2
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            텍스트 3
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={75.5}
          variant="determinate"
        />
      
      <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          텍스트 3-1
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          텍스트 3-2
          <br>
          </br>
          텍스트 3-3
          <br>
          </br>
          텍스트 3-4
        </Typography>



      </Box>
    </CardContent>
  </Card>
);
