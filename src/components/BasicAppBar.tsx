import { Box, Toolbar, AppBar, Typography, Tooltip, Menu, MenuItem, Button} from '@mui/material';
import { useColorMode } from '../hooks';

export default function DrawerAppBar() {
    const { icon, text, toggleColorMode } = useColorMode();

    return (
      <Box sx={{ display: 'flex'}}>
        <AppBar component="nav" position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <Toolbar sx={{textAlign: 'center'}}>
            <Typography
                variant="h4"
                component="div"
            >
                ToolsAnon
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Tooltip title="Toggle Color Mode">
                <Button onClick={toggleColorMode} sx={{color: 'text.primary'}}>
                  <Typography component="div" sx={{paddingRight: '5px'}}>
                    {text}
                  </Typography>
                    {icon}
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
}