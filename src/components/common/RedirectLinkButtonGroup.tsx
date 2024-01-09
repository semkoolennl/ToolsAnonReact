import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { QrCode2 } from "@mui/icons-material";
import Stack from "@mui/material/Stack";

import { RouterLink, CopyButton } from ".";

interface RedirectLinkButtonGroupProps {
    redirectUrl: string,
    title?: string,
    tooltip?: string,
}

export default function RedirectLinkButtonGroup({ redirectUrl, title, tooltip }: RedirectLinkButtonGroupProps ) {

    const handleQrCodeButtonClick = () => {
        console.log("handleQrCodeButtonClick");
    }

    return (
        <>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
                <Tooltip title={tooltip ? tooltip : redirectUrl} placement="top" arrow>
                    <RouterLink to={redirectUrl} newTab sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'}} fontSize="large">
                        {title ? title : redirectUrl}
                    </RouterLink>
                </Tooltip>
                <Tooltip title="Generate QR-Code" placement="top" arrow>
                    <IconButton size="large" onClick={handleQrCodeButtonClick} sx={{ p: 0.5 }}>
                        <QrCode2 fontSize="large"/>
                    </IconButton>
                </Tooltip>
                <CopyButton size="large" value={redirectUrl} sx={{ p: 0.5 }} placement="top" arrow/>
            </Stack>
        </>
    )
}