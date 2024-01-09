import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RedirectLinkForm from "../../components/forms/RedirectLinkForm";
import ModalFormContainer from "../../components/forms/ModalFormContainer";

const emptyLink = {
    id: '',
    user_id: 0,
    name: '',
    description: '',
    url: '',
    slug: '',
    clicks: 0,
    is_enabled: true,
    created_at: '',
    updated_at: '',
};

export default function RedirectsCreate() {
    const navigate = useNavigate();

    function handleClose() {
        navigate('/redirects');
    }

    return (
        <>
            <ModalFormContainer handleClose={handleClose} >
                <h1>Test</h1>
            </ModalFormContainer>
        </>
    )
}