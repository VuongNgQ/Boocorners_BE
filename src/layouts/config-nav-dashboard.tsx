import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Tổng quan',
    items: [{ title: 'Statistical', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  /**
   * Management
   */
  {
    subheader: 'Quản lí',
    items: [
      {
        title: 'Category',
        path: paths.dashboard.category.root,
        icon: ICONS.menuItem,
        children: [
          { title: 'List', path: paths.dashboard.category.list },
          { title: 'Create', path: paths.dashboard.category.create },
        ],
      },
      {
        title: 'Product',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.list },
          { title: 'Create', path: paths.dashboard.product.create },
        ],
      },
      {
        title: 'Order',
        path: paths.dashboard.order.list,
        icon: ICONS.order,
      },
      {
        title: 'Customer',
        path: paths.dashboard.customer.list,
        icon: ICONS.user,
      },
    ],
  },
];