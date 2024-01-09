import { useEffect, useContext } from 'react';
import { Box, Toolbar, Divider, Drawer} from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColorModeContext, DrawerModeContext } from '../context';


const navItems = ['Redirect Links', 'About', 'Contact'];

export default function DrawerNav({ width, active }: { width: number, active: 'Redirect Links' | 'About' | 'Contact'}) {
    const { icon, text, toggleColorMode } = useContext(ColorModeContext);
    const { open, toggleDrawer }          = useContext(DrawerModeContext);

    useEffect(() => {}, [open]);

    return (
        <Drawer
            variant={useMediaQuery('(min-width:900px)') ? 'permanent' : 'temporary'}
            open={open}
            onClose={toggleDrawer}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            anchor='left'
            sx={{
                width: width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                },
            }}
        >
        <Toolbar />
        <Box sx={{ textAlign: 'center' }}>
          <List sx={{ pt: 0}}>
            <Divider />
            {navItems.map((item) => {
              const backgroundColor = item === active ? 'action.disabled' : 'transparent';

              return (
                <ListItem key={item} disablePadding onClick={toggleDrawer}>
                  <ListItemButton sx={{ textAlign: 'center', backgroundColor: backgroundColor }}  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              )
            })}
            <Divider />
            <ListItem key={'ColorMode'} disablePadding onClick={toggleColorMode}>
              <ListItemButton>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText>
                    {text}
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>
    )
}