import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

class createThunkBuilder<StateType>
{
    private builder: ActionReducerMapBuilder<StateType>;
    private current: typeof createAsyncThunk | null = null;

    constructor(builder: ActionReducerMapBuilder<StateType>)
    {
        this.builder = builder;
    }

    public addThunk<Returns, ArgTypes extends unknown[]>(
        typePrefix: string,
        thunkAction: (...args: ArgTypes) => Promise<Returns>
    ) {
        type ArgsTypes = Parameters<typeof thunkAction>;
        const thunk = createAsyncThunk<Returns, ArgsTypes, { rejectValue: string }>(
            typePrefix,
            async (args: ArgsTypes, { rejectWithValue }) => {
                try {
                    return await thunkAction(...args);
                } catch (error) {
                    if (error instanceof Error) {
                        return rejectWithValue(error.message);
                    }
                    return rejectWithValue('An unknown error occurred');
                }
            }
        );


    }


}