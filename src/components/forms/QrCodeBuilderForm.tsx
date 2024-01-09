import ModalFormContainer from "./ModalFormContainer";
import { Box, TextField, Typography } from "@mui/material";

interface QrCodeModalProps {
    text: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function QrBuilderForm({ text }: QrCodeModalProps) {
    const handleClose = () => {

    }

    return (
        <ModalFormContainer handleClose={handleClose} zIndex={200} maxWidth="xl">
            <Typography variant="h5" sx={{ mb: 2 }}>QR-Code</Typography>
            <TextField fullWidth value={text} disabled sx={{ mb: 2 }}/>
        </ModalFormContainer>
    )
}