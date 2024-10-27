import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from '../svg-color';
import { BreadcrumbsLink } from './breadcrumb-link';

import type { CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------

export function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  slotProps,
  loading,
  sx,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1].name;

  const renderHeading = (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography variant="h4" sx={{ flexShrink: 0, ...slotProps?.heading }}>
        {heading}
      </Typography>
      {loading && (
        <CircularProgress
          sx={{
            ml: 1,

            color: 'secondary.dark',
          }}
          size={25}
        />
      )}
    </Box>
  );

  const renderLinks = (
    <Breadcrumbs
      separator={
        <SvgColor
          src="/assets/icons/arrow-down.svg"
          sx={{
            transform: 'rotate(270deg)',
            width: pxToRem(11.5),
            height: pxToRem(6.5),
            color: '#797979',
          }}
        />
      }
      sx={{
        '& .MuiBreadcrumbs-ol': { columnGap: pxToRem(4) },
        '& .MuiBreadcrumbs-li:last-child *': {
          color: 'black',
        },
        '&, & a': {
          fontSize: pxToRem(16),
          fontWeight: 400,
          lineHeight: pxToRem(24.19),
          color: '#797979',
        },
        ...slotProps?.breadcrumbs,
      }}
      {...other}
    >
      {links.map((link, index) => (
        <BreadcrumbsLink
          key={link.name ?? index}
          link={link}
          activeLast={activeLast}
          disabled={link.name === lastLink}
        />
      ))}
    </Breadcrumbs>
  );

  const renderAction = <Box sx={{ flexShrink: 0, ...slotProps?.action }}> {action} </Box>;

  const renderMoreLink = (
    <Box component="ul">
      {moreLink?.map((href) => (
        <Box key={href} component="li" sx={{ display: 'flex' }}>
          <Link href={href} variant="body2" target="_blank" rel="noopener" sx={slotProps?.moreLink}>
            {href}
          </Link>
        </Box>
      ))}
    </Box>
  );

  return (
    <Stack spacing={2} sx={sx}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && renderHeading}

          {!!links.length && renderLinks}
        </Box>

        {action && renderAction}
      </Stack>

      {!!moreLink && renderMoreLink}
    </Stack>
  );
}
