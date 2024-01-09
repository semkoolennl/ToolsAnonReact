import * as React from 'react';
import moment from 'moment-timezone';
import { Box, Stack, Typography, Chip, Paper} from '@mui/material';

import { RouterLink } from './common/.';
import { RedirectLink } from '../apiclient/toolsanon/types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentLink, updateLink } from '../store/redirectLinkSlice';

const activeBox   = '-1px 1px 3px 4 px rgba(0,255,0,0.5), 0 0 5px rgba(0, 0, 0, 0.5)'; // green glow when enabled
const inactiveBox = '-1px 1px 3px 4px rgba(255,0,0,0.5), 0 0 5px rgba(0, 0, 0, 0.5)'; // red glow when disabled

interface RedirectLinkCardProps {
    object: RedirectLink,
}

export default function RedirectLinkCard({ object }: RedirectLinkCardProps) {
    const dispatch                  = useDispatch();
    const navigate                  = useNavigate();
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
        // Check if the target of the click event is an interactive element
        const target = event.target as HTMLElement;
        const isInteractiveElement = target.tagName === 'A' || target.tagName === 'BUTTON';

        // If it's an interactive element, don't trigger the openForm function
        if (!isInteractiveElement) {
            dispatch(setCurrentLink(object.id));
            navigate(`/redirects/${object.id}/edit`);
        }
    }

    return (
        <>
            <Paper
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        handleClick(event);
                    }
                }}
                sx={{
                    borderRadius: 4,
                    borderTopRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    flexGrow: 1,
                    mb: 4,
                    width: '100%',
                    px: 1.5,
                    py: 1,
                    '&:hover': {
                        cursor: 'pointer',
                        boxShadow: object.is_enabled ? activeBox : inactiveBox,
                    },
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="stretch">
                    <Box sx={{overflow: 'hidden' }}>
                        <Typography variant="h6" component="div" sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {object.name}
                        </Typography>
                        <RouterLink to={object.url} newTab sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {object.url}
                        </RouterLink>
                    </Box>
                    <Stack direction="column" justifyContent="flex-start" alignItems="flex-end" >
                        <Stack direction="row" justifyContent="flex-end" alignItems="flex-start">
                            <Chip
                                label={object.id}
                                variant='outlined'
                                color="info"
                                sx={{mr: 0.5}}
                            />
                            <Chip
                                label={object.clicks + " redirects"}
                                variant='outlined'
                                color="info"
                                sx={{mr: 0.5}}
                            />
                            <Chip
                                variant='outlined'
                                label={object.is_enabled ? 'Enabled' : 'Disabled'}
                                color={object.is_enabled ? 'success' : 'error'}
                            />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{mt: 0.5, mr: 0.3, ml: 1, whiteSpace: 'nowrap'}}>
                            Updated: {moment(object.updated_at).fromNow()}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{
                    p: 0.5,
                    ml: -0.1,
                    mt: 0.5,
                    mb: 0.5,
                    backgroundColor: 'background.paperbg',
                    borderRadius: 2,
                }}
                >
                    {object.description.length > 255 ? `${object.description.slice(0, 255)}...` : object.description }
                </Typography>
            </Paper>
        </>
    )
}