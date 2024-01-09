import React, { useContext, useState, useEffect } from "react";
import ToolsAnonApiClient from "../apiclient/toolsanon/ApiClient";

export const ApiClientContext = React.createContext({
    api: {} as ToolsAnonApiClient,
});

export function ApiClientProvider({ children }: any) {
    const [ToolsAnonApi, setToolsAnonApi] = useState(new ToolsAnonApiClient());

    return (
        <ApiClientContext.Provider value={{ api: ToolsAnonApi! }}>
            {children}
        </ApiClientContext.Provider>
    )
}