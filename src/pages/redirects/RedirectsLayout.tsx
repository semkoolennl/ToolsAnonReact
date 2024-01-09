import { Box, Toolbar } from '@mui/material';
import AppBar from '../../components/AppBar';
import DrawerNav from '../../components/DrawerNav';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import RedirectsList from './RedirectsList';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedRoute from '../../components/common/AnimatedRoute';
import RedirectsCreate from './RedirectsCreate';
import RedirectLinkForm from '../../components/forms/RedirectLinkForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import RedirectsEdit from './RedirectsEdit';

export default function RedirectsLayout() {
    const currentLink = useSelector((state: RootState) => state.redirectLinks.currentLink);

    return (
        <Box sx={{ display: 'flex', height: '100vh'}}>
            <AppBar />
            <DrawerNav width={240} active='Redirect Links' />
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Toolbar />
                <RedirectsList />
                <Routes>
                    <Route path='/create' element={<RedirectsCreate />}/>
                    <Route path='/:linkId/edit' element={<RedirectsEdit />} />
                </Routes>
            </Box>
        </Box>
    );
}