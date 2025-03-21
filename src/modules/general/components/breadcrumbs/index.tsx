import * as React from 'react';
import Box from '@mui/material/Box';
import Link, { LinkProps } from '@mui/material/Link';
import { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink, Route, Routes, MemoryRouter, useLocation } from 'react-router-dom';
import { rutasGeneral } from '@modules/general/router/router';


interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

// const breadcrumbNameMap: { [key: string]: string } = {
//   rutasGeneral : 
// };

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton component={RouterLink as any} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItemButton>
    </li>
  );
}

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

function Page() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} sx={{ color: 'text.primary' }}>
            {to}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {to}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default function RouterBreadcrumbs() {

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Routes>
          <Route path="*" element={<Page />} />
        </Routes>
      </Box>
  );
}