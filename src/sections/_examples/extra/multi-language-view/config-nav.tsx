import type { TFunction } from 'i18next';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export function navData(t: TFunction<any, any>) {
  return [
    {
      subheader: t('subheader'),
      items: [
        {
          title: t('app'),
          path: '',
          icon: <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/ic-invoice.svg`} />,
        },
        {
          title: t('travel'),
          path: '#disabled',
          icon: <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/ic-tour.svg`} />,
        },
        {
          title: t('job'),
          path: '#label',
          icon: <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/ic-job.svg`} />,
          info: (
            <Label
              color="info"
              variant="inverted"
              startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
            >
              NEW
            </Label>
          ),
        },
        {
          title: t('blog.title'),
          path: '#caption',
          icon: <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/ic-blog.svg`} />,
          caption: t('blog.caption'),
        },
        {
          title: t('user'),
          path: 'https://www.google.com/',
          icon: <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/ic-user.svg`} />,
        },
        {
          title: t('invoice'),
          path: '',
          icon: <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/ic-invoice.svg`} />,
        },
      ],
    },
  ];
}
