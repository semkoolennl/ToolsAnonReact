import React from 'react';
import { Link as BaseLink } from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

interface RouterLinkProps extends MuiLinkProps {
    to: string;
    newTab?: boolean;
}

const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(({ children, to, newTab = false, ...props }, ref) => {
    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    const linkProps = { ...newTabProps, ...props };

    return (
        <MuiLink {...linkProps} component={BaseLink} to={to} ref={ref}>
            {children}
        </MuiLink>
    );
});

export default RouterLink;
