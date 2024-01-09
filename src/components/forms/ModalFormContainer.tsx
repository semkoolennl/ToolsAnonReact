import * as React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Container, IconButton, SxProps, Theme } from '@mui/material';
import { Close } from '@mui/icons-material';

import AnimatedModal from '../common/AnimatedModal';

const container = {
    hidden: {
        opacity: 0,
        scale: 2,
        y: 0,
        transition: {
        duration: 0.4,
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
        delay: 0.2,
        duration: 0.3,
        delayChildren: 0.5,
        staggerChildren: 0.1,
        }
    },
    exit: {
        opacity: 0,
        scale: 0,
        y: '100vh',
        transition: {
        duration: 0.5,
        }
    }
}

interface AnimatedModalProps {
    children?: React.ReactNode;
    handleClose: () => void;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    sx?: SxProps<Theme>;
    zIndex?: number;
}

const defaultContainerSx = {
    backgroundColor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
}

export default function ModalFormContainer({ children, handleClose, maxWidth = 'sm', sx = defaultContainerSx, zIndex = 5000}: AnimatedModalProps) {
    const [open, setOpen] = React.useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);

    const handleCloseModal = () => {
        setIsAnimatingOut(true);
    }

    const handleAnimationComplete = (variant: string) => {
        if (variant === 'exit') {
            setIsAnimatingOut(false);
            setOpen(false);
            handleClose();
        }
    }

    return (
        <AnimatedModal open={open} onClose={handleClose} zIndex={zIndex}>
          <AnimatePresence>

            {open && !isAnimatingOut && (
            <motion.div variants={container} initial="hidden" animate="visible" exit="exit" onAnimationComplete={handleAnimationComplete}>
              <Container component="main" maxWidth={maxWidth} sx={sx}>
                <IconButton onClick={handleCloseModal} sx={{position: 'absolute', top: 5, right: 5}}>
                    <Close />
                </IconButton>
                { children }
              </Container>
            </motion.div>
            )}

          </AnimatePresence>
        </AnimatedModal>
    );
}

