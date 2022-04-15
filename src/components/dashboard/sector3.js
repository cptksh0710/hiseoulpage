import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Sector3 = (props) => (
  <Card {...props}>
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
            SECTOR 3
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            텍스트4
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>

          <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          텍스트 4-1
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          텍스트 4-2
          <br>
          </br>
          텍스트 4-3
          <br>
          </br>
          텍스트 4-4
        </Typography>


        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
