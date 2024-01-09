import { Box, Toolbar, Typography, Container, Stack, Card, TextField, Paper, InputAdornment, IconButton, Button, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AppBar from '../../components/AppBar';
import DrawerNav from '../../components/DrawerNav';
import RedirectLinkCard from '../../components/RedirectLinkCard';
import { AddCircleOutline, CreateRounded, HandymanOutlined, SearchRounded } from '@mui/icons-material';
import SearchField from '../../components/common/SearchField';
import RedirectLinkForm from '../../components/forms/RedirectLinkForm';
import { RedirectLink } from '../../apiclient/toolsanon/types';
import QrBuilderForm from '../../components/forms/QrCodeBuilderForm';

import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addLink } from '../../store/redirectLinkSlice';
import { Navigate, Route, useNavigate } from 'react-router-dom';

const item = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    },
  }

const container = {
    hidden: {
        opacity: 1,
        scale: 1,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.3,
            delayChildren: 0.5,
            staggerChildren: 0.3,
        }
    },
}


const link = {
    id: '9ab4e13e-260a-4c84-a644-4ea6c1a31ff2',
    user_id: 6,
    name: 'Test Link With A Long Name',
    description: `Test Description, i am gonna make this really long lorum ipsums
    so that i can test the wrapping of the text. I am also going to add a link

    `,
    url: 'https://example.com/iamadsaosdoasj/asds8adasd',
    slug: '',
    clicks: 0,
    is_enabled: true,
    created_at: '2023-11-26T16:37:17.000000Z',
    updated_at: '2023-11-07T16:37:17.000000Z',
};

export default function RedirectsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const links    = useSelector((state: RootState) => state.redirectLinks.links);

    useEffect(() => {
        Array.from({ length: 10 }).map((_, i) => {
            const copy = {...link};
            copy.name = copy.name + ' - ' + i;
            copy.id = copy.id + i;
            copy.is_enabled = Math.random() > 0.5;
            dispatch(addLink(copy));
        }
    )}, []);

    const handleCreate = () => {
        navigate('/redirects/create');
    }

        // if create is true, then navigate to /create

    return (
        <motion.div variants={container} initial='hidden' animate='visible'>
            <Box sx={{overflow: 'auto', p: 3}}>
                <Container sx={{flexGrow: 1}} maxWidth='xl'>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            mb: 3,
                            width: '100%',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        }}
                        >
                        <SearchField onChange={(value) => console.log(value)}/>
                        <Button
                            onClick={handleCreate}
                            variant="contained"
                            startIcon={<AddCircleOutline fontSize='large'/>}
                            sx={{ ml: 1, borderRadius: 4, boxShadow: 20}}>
                            Create
                        </Button>
                    </Stack>
                    { Object.entries(links).map(([key, value]) => (
                        <motion.div variants={item}>
                            <RedirectLinkCard
                                key={key}
                                object={value}
                            />
                        </motion.div>
                    ))}
                </Container>
            </Box>
        </motion.div>

    )
}