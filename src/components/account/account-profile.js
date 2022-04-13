import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import Username from './username';

const user = {
  avatar: '/static/images/avatars/ico_01.png',
  name: 'kicheol kim',
};

export const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 200,
            mb: 2,
            width: 200
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          <Username />
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);
