import { motion, AnimatePresence, Variants } from 'framer-motion';

interface AnimatedModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    backdropVariants?: Variants;
    modalVariants?: Variants;
    zIndex?: number;
}

export default function AnimatedModal({ children, open, onClose, backdropVariants, modalVariants, zIndex = 1000}: AnimatedModalProps) {
    const backdrop = backdropVariants ?? {
        visible: {
            opacity: 1,
            backgroundColor: `rgba(0, 0, 0, 0.5)`,
            transition: {
                when: "beforeChildren",
                duration: 0.2,
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    };

    const modal = modalVariants ?? {
        hidden: {
            y: "-50%",
            x: '-50%',
            opacity: 0,
            transition: {
                duration: 0.2,
            },

        },
        visible: {
            y: "-50%",
            x: '-50%',
            opacity: 1,
            transition: {
                when: "beforeChildren",
                duration: 0.2,
            },
        },
    };

    return (
        <AnimatePresence mode='sync'>
            {open && (
                <motion.div
                    key="modal"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: zIndex,
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        key="modal"
                        variants={modal}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            zIndex: zIndex + 1,
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}