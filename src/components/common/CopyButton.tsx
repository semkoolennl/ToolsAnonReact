import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useCopyToClipboard } from 'usehooks-ts';
import { IconButtonProps } from '@mui/material';

interface CopyButtonProps extends IconButtonProps {
    placement?: 'left' | 'right' | 'top' | 'bottom';
    arrow?: boolean;
    value: string;
    callback?: () => void;
}

export default function CopyButton({ placement = "right", arrow = false, value, callback, ...props}: CopyButtonProps) {
    const [valuestate, copy]        = useCopyToClipboard();
    const [valueCopy, setValueCopy] = React.useState(value);

    const [clicked, setClicked] = React.useState(false);

    const handleClick = () => {
        setClicked(true);
        copy(valueCopy);
        if (callback) {
            callback();
        }
        setTimeout(() => setClicked(false), 2000);
    }

    React.useEffect(() => {
        setValueCopy(value);
    }, [value]);

    return (
        <Tooltip title={(clicked ? 'Copied' : 'Copy') + ' to clipboard.'} placement={placement} arrow={arrow}>
            <IconButton aria-label='Copy to link to clipboard' onClick={handleClick} {...props}>
                <ContentCopy fontSize={props.size} color={clicked ? 'disabled' : 'success'}/>
            </IconButton>
        </Tooltip>
    )
}