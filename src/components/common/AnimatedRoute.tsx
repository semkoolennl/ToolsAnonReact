import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimatedRoute({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const variants = {
        initial: { x: 200,  opacity: 0 },
        animate: { x: 0,    opacity: 1 },
        exit:    { x: -200, opacity: 0 },
    };

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={location.pathname}
                variants={variants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}