import React from 'react'
import { Box, BoxProps } from '@mui/material'

interface OverlayProps extends  BoxProps {
    transparency?: number;
    zIndex?: BoxProps['zIndex'];
}

const Overlay: React.FC<OverlayProps> = ({ children, transparency, zIndex }) => {
    const alpha = transparency ?? 0.5;
    const index = zIndex ?? 1;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(0, 0, 0, ${alpha})`,
                order: -1,
                zIndex: index,
            }}
        >
            {children}
        </Box>
    )
}

export default Overlay