import * as React from 'react';
import { Box, Toolbar, AppBar, Typography, IconButton, Avatar, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BasicAppBar from './BasicAppBar';
import AccountMenu from './AccountMenu';
import { useAuth, useDrawerMode } from '../hooks';

export default function DrawerAppBar() {
  const { isAuthenticated } = useAuth();
  const { toggleDrawer }    = useDrawerMode();

  if (!isAuthenticated) {
    return (<BasicAppBar />)
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <AppBar component="nav" position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Tooltip title="Menu">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h4"
            component="div"
          >
            ToolsAnon
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <AccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}