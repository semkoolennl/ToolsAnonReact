
import { configureStore, createAsyncThunk, PayloadAction, ActionReducerMapBuilder, Draft } from "@reduxjs/toolkit";
import thunk, { ThunkAction }  from "redux-thunk";
import ApiClient from "../apiclient/toolsanon/ApiClient";
import redirectLinksReducer from "./redirectLinkSlice";
import qrCodeBuilderReducer from "../slices/qrCodeBuilderSlice";


const store = configureStore({
    reducer: {
        redirectLinks: redirectLinksReducer,
        qrCodeBuilder: qrCodeBuilderReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export const api = new ApiClient();

export const createGenericAsyncThunk = <Returns, ArgTypes extends unknown[]>(
    typePrefix: string,
    apiFunction: (...args: ArgTypes) => Promise<Returns>
) => {
        type ArgsTypes = Parameters<typeof apiFunction>;
        return createAsyncThunk<Returns, ArgsTypes, { rejectValue: string }>(
        typePrefix,
        async (args: ArgsTypes, { rejectWithValue }) => {
            try {
                return await apiFunction(...args);
            } catch (error) {
                if (error instanceof Error) {
                    return rejectWithValue(error.message);
                }
                return rejectWithValue('An unknown error occurred');
            }
        }
    );
};

export const createThunkBuilder = <StateType>(
    builder: ActionReducerMapBuilder<StateType>,
) => {
    return createAsyncThunkHandler<StateType>
};


export const createAsyncThunkHandler = <StateType>(
    setLoadingState: (state: Draft<StateType>, isLoading: boolean) => void,
    setErrorState: (state: Draft<StateType>, error: string | null) => void,
) => {
    return <Returns, ArgType extends unknown[]>(
        builder: ActionReducerMapBuilder<StateType>,
        asyncThunk: ReturnType<typeof createGenericAsyncThunk<Returns, ArgType>>,
        successAction: (state: Draft<StateType>, action: PayloadAction<Returns>) => void
      ) => {
        builder
          .addCase(asyncThunk.pending, (state) => {
            setLoadingState(state, true);
            setErrorState(state, null);
          })
          .addCase(asyncThunk.fulfilled, (state, action) => {
            setLoadingState(state, false);
            successAction(state, action);
          })
          .addCase(asyncThunk.rejected, (state, action) => {
            setLoadingState(state, false);
            setErrorState(state, action.error.message || 'An error occurred');
          });
      };
};

export const createAsyncThunkBuilder = <StateType>(
    setLoadingState: (state: Draft<StateType>, isLoading: boolean) => void,
    setErrorState: (state: Draft<StateType>, error: string | null) => void,
) => {
    return <Returns, ArgType extends unknown[]>(
        builder: ActionReducerMapBuilder<StateType>,
        typePrefix: string,
        stages: Stages<StateType, Returns, ArgType>
      ) => {
        const thunk = createGenericAsyncThunk<Returns, ArgType>(
            typePrefix,
            stages.thunk
        );
        builder
          .addCase(thunk.pending, (state, action) => {
            setLoadingState(state, true);
            setErrorState(state, null);
            if (stages.before) {
                stages.before(state, ...action.meta.arg);
            }
          })
          .addCase(thunk.fulfilled, (state, action) => {
            setLoadingState(state, false);
            if (stages.success) {
                stages.success(state, action.payload, ...action.meta.arg);
            }
          })
          .addCase(thunk.rejected, (state, action) => {
            if (stages.error) {
                stages.error(state, action.error.message || 'An error occurred', ...action.meta.arg);
            }
            setLoadingState(state, false);
            setErrorState(state, action.error.message || 'An error occurred');
          });
      };
};


export const createThunkHandler = <StateType>(
    builder: ActionReducerMapBuilder<StateType>,
    typePrefix: string,
    setLoadingState: (state: Draft<StateType>, isLoading: boolean) => void,
    setErrorState:   (state: Draft<StateType>, error: string | null) => void,
) => {
    const handler = createAsyncThunkBuilder<StateType>(setLoadingState, setErrorState);
    return createThunkWithHandlersBuilder(builder, typePrefix, handler);
}

type ThunkSuccessAction<Returns, ArgType> = PayloadAction<Returns, string, {
    arg: ArgType,
    requestId: string;
    requestStatus: "fulfilled";
}, never>


type Stages<StateType, Returns, ArgTypes extends unknown[]> = {
    thunk: (...args: ArgTypes) => Promise<Returns>,
    before?: (state: Draft<StateType>, ...args: ArgTypes) => void,
    success?: (state: Draft<StateType>, response: Returns, ...args: ArgTypes) => void,
    error?: (state: Draft<StateType>, error: string, ...args: ArgTypes) => void
};

export const createThunkWithHandlersBuilder = <StateType>(
    builder: ActionReducerMapBuilder<StateType>,
    typePrefix: string,
    handler: ReturnType<typeof createAsyncThunkBuilder<StateType>>
) => {
    function staged<Returns, ArgType extends unknown[]>(
        typeSuffix: string,
        stagedThunk: Stages<StateType, Returns, ArgType>
    ) {
        const fullType = typePrefix + '/' + typeSuffix;
        return handler(builder, fullType, stagedThunk);
    }

    function basic<Returns, ArgType extends unknown[]>(
        typeSuffix: string,
        thunkAction: (...args: ArgType) => Promise<Returns>,
        successAction: (state: Draft<StateType>, response: Returns, ...args: ArgType) => void,
    ) {
        const fullType = typePrefix + '/' + typeSuffix;
        return handler(builder, fullType, {thunk: thunkAction, success: successAction});
    }

    return { staged, basic };
}



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;