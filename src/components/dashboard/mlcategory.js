import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export const Mlcategory = (props) => (
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
            ML Category
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            텍스트1
          </Typography>
        </Grid>
        
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          텍스트 1-1
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          텍스트 1-2
          <br>
          </br>
          텍스트 1-3
          <br>
          </br>
          텍스트 1-4
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
