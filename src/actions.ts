import { ThunkAction} from "redux-thunk"
import { RootState } from './store/store';
import { Action, AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "./apiclient/toolsanon/ApiClient";
import { updateLink, updateLinkStatus } from "./store/redirectLinkSlice";
import { RedirectLinkRequest } from "./apiclient/toolsanon/endpoints/redirectLinkEndpoint";

const apiclient = new ApiClient();

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
>;


export const updateRedirectLinkStatus = (id: string, newStatus: boolean): AppThunk => async dispatch => {
    dispatch(updateLinkStatus({id, newStatus}));
    try {
        const response = await apiclient.links.patch(id, {is_enabled: newStatus});
        console.log("Updated Redirect Link status");
        console.log(response);
    } catch (error) {
        dispatch(updateLinkStatus({id: id, newStatus: !newStatus}));
        alert("Failed to update the Redirect Link status: " + (error as Error).message)
    }
};

export const updateRedirectLink = (id: string, data: RedirectLinkRequest): AppThunk => async dispatch => {
    try {
        const response = await apiclient.links.update(id, data);
        console.log("Updated Redirect Link");
        console.log(response);
        dispatch(updateLink({id, data: response}));
    } catch (error) {
        alert("Failed to update the Redirect Link: " + (error as Error).message)
    }
}

