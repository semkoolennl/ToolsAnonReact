import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface QrCodeBuilderState {
    isOpen: boolean,
    value: string | null,
    loading: boolean,
    error: string | null
}

const qrCodeBuilderSlice = createSlice({
    name: 'qrCodeBuilder',
    initialState: <QrCodeBuilderState>{
        isOpen: false,
        value: null as string | null,
        loading: false,
        error: null as string | null
    },
    reducers: {
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        },
        setValue: (state, action: PayloadAction<string | null>) => {
            state.value = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
})

export const { open, close, setValue, setLoading, setError } = qrCodeBuilderSlice.actions;
export default qrCodeBuilderSlice.reducer;