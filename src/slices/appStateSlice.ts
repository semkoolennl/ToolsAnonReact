import { Reducer, Action, AnyAction } from 'redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RedirectLink } from '../apiclient/toolsanon/types';
import { RedirectLinkRequest } from '../apiclient/toolsanon/endpoints/redirectLinkEndpoint';

interface AppState {

}

const appStateSlice = createSlice({
    name: 'appState',
    initialState: {},
    reducers: {

    }
})

export const {} = appStateSlice.actions;
export default appStateSlice.reducer;
