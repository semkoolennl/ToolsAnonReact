import { PayloadAction, createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { RedirectLink } from '../apiclient/toolsanon/types';
import { RedirectLinkRequest } from '../apiclient/toolsanon/endpoints/redirectLinkEndpoint';
import { createGenericAsyncThunk, createAsyncThunkHandler, api, createThunkHandler } from './store';
import { Draft } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { string } from 'yup';

interface RedirectLinksState {
    links: {[id: string]: RedirectLink},
    loading: boolean,
    error: string | null,
    currentLink: string | null
}

const redirectLinksSlice = createSlice({
    name: 'redirectLinks',
    initialState: <RedirectLinksState>{
        links: {},
        loading: false,
        error: null,
        currentLink: null
    },
    reducers: {
        addLink: (state, action: PayloadAction<RedirectLink>) => {
            state.links[action.payload.id] = action.payload;
        },
        removeLink: (state, action: PayloadAction<string>) => {
            delete state.links[action.payload];
        },
        updateLink: (state, action: PayloadAction<{id: string, data: RedirectLinkRequest}>) => {
            const link = state.links[action.payload.id]
            if (link) {
                Object.assign(link, action.payload.data);
            }
        },
        updateLinkStatus: (state, action: PayloadAction<{id: string, newStatus: boolean}>) => {
            const link = state.links[action.payload.id];
            link.is_enabled = action.payload.newStatus;
        },
        setCurrentLink: (state, action: PayloadAction<string>) => {
            state.currentLink = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        const { basic, staged } = createThunkHandler(builder, 'redirectLinks',
            (state, isLoading) => { state.loading = isLoading },
            (state, error)     => { state.error   = error     }
        );

        basic('updateRedirectLink', api.links.update, (state, response) => {
            const link = state.links[response.id];
        }),
        basic('patchRedirectLink', api.links.patch, (state, response) => {
            Object.assign(state.links[response.id], response);
        }),
        staged('updateRedirectLinkStatus', {
            thunk: updateRedirectLinkStatus,
            before: (state, id, newStatus) => {
                state.links[id].is_enabled = newStatus
            },
            success: (state, response, id, newStatus) => {
                state.links[id].is_enabled = newStatus;
            },
            error: (state, response, id, newStatus) => {
                state.links[id].is_enabled = !newStatus;
            }
        }),
        basic('deleteRedirectLink', deleteRedirectLinkApi, (state, action, id) => delete state.links[id])
    }
})


async function deleteRedirectLinkApi(id: string) {
    await api.links.delete(id);
    return id;
}

async function updateRedirectLinkStatus(id: string, newStatus: boolean) {
    return api.links.patch(id, {is_enabled: newStatus});
}

const updateLinkInState = (state: RedirectLinksState, action: RedirectLink) => {
    if (state.links[link.id]) {
        Object.assign(state.links[link.id], link);
    }
};

export const { addLink, removeLink, updateLink, updateLinkStatus, setCurrentLink, setLoading, setError } = redirectLinksSlice.actions;
export default redirectLinksSlice.reducer;
