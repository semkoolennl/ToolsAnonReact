import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import RedirectLinkForm from '../../components/forms/RedirectLinkForm';
import { useEffect, useState } from 'react';
import { RedirectLink } from '../../apiclient/toolsanon/types';


export default function RedirectsEdit() {
    const navigate   = useNavigate();
    const { linkId } = useParams();

    if (!linkId) {
        navigate('/redirects');
    }

    const link = useSelector((state: RootState) => state.redirectLinks.links[linkId as string]);

    return (
      <>
        <RedirectLinkForm object={link} />
      </>
    );
}