import { useState } from "react";

import { Divider, IconButton, InputBase, Paper} from "@mui/material";
import { ClearRounded, SearchRounded } from "@mui/icons-material";

export default function SearchField({ onChange }: { onChange: (value: string) => void}) {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e.target.value);
    }

    const handleClear = () => {
        setValue('');
        onChange('');
    }

    return (
        <Paper sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            border: '2px solid',
            borderRadius: 5,
            borderColor: 'text.disabled',
            boxShadow: 5,
        }}>
            <SearchRounded
                sx={{
                    mx: 1,
                    my: 0.5,
                    color: 'text.disabled',
                }}
            />
            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    borderColor: 'text.disabled'
                }}
            />
            <InputBase
                placeholder="Search..."
                onChange={handleChange}
                value={value}
                inputProps={{
                    'aria-label': 'search'
                }}
                sx={{
                    width: '100%',
                    ml: 1,
                    mr: 'auto'
                }}
            />
            <IconButton size="small" onClick={handleClear} sx={{ p: '4px', mr: '-1px'}}>
                <ClearRounded color="error"/>
            </IconButton>
        </Paper>
    )
}