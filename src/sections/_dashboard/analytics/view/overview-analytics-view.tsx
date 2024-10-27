import { useState } from 'react';

import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { fCurrency } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { useGetStatistic } from 'src/actions/statistic';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const { statistic } = useGetStatistic();
  const timeframeLabels: any = {
    day: 'ngày',
    month: 'tháng',
    year: 'năm',
  };

  const colors = ['#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0'];

  const [revenueTimeframe, setRevenueTimeframe] = useState('day');
  const [ordersTimeframe, setOrdersTimeframe] = useState('day');

  const mapDataByTimeframe = (timeframe: any, data: any) => {
    const categories: any = [];
    const seriesData: any = [];

    Object.entries(data?.[timeframe] || {}).forEach(([key, value]) => {
      let label;
      if (timeframe === 'day') label = `Ngày ${key}`;
      if (timeframe === 'month') label = `Tháng ${key}`;
      if (timeframe === 'year') label = `Năm ${key}`;

      categories.push(label);
      seriesData.push(value);
    });

    return { categories, seriesData };
  };

  const revenueMapped = mapDataByTimeframe(revenueTimeframe, statistic?.revenueByTime);
  const ordersMapped = mapDataByTimeframe(ordersTimeframe, statistic?.ordersByTime);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Tổng doanh thu"
            percent={0}
            total={fCurrency(statistic?.totalRevenue)}
            icon={
              <img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-bag.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Số khách mua hàng"
            percent={-0.1}
            total={`${statistic?.soldToCustomers}`}
            color="secondary"
            icon={
              <img
                alt="icon"
                src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-users.svg`}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Tổng đơn hàng"
            percent={-0.1}
            total={`${statistic?.totalOrders}`}
            color="warning"
            icon={
              <img alt="icon" src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-buy.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Tổng sản phẩm bán ra"
            percent={2.8}
            total={`${statistic?.totalProductsSold}`}
            color="error"
            icon={
              <img
                alt="icon"
                src={`${CONFIG.site.basePath}/assets/icons/glass/ic-glass-message.svg`}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          {/* Nút chọn khoảng thời gian cho doanh thu */}
          <div>
            <Button
              variant={revenueTimeframe === 'day' ? 'contained' : 'outlined'}
              onClick={() => setRevenueTimeframe('day')}
            >
              Ngày
            </Button>
            <Button
              variant={revenueTimeframe === 'month' ? 'contained' : 'outlined'}
              onClick={() => setRevenueTimeframe('month')}
            >
              Tháng
            </Button>
            <Button
              variant={revenueTimeframe === 'year' ? 'contained' : 'outlined'}
              onClick={() => setRevenueTimeframe('year')}
            >
              Năm
            </Button>
          </div>

          <AnalyticsWebsiteVisits
            title="Doanh thu theo thời gian"
            subheader={`(Hiển thị theo ${timeframeLabels[revenueTimeframe]})`}
            chart={{
              colors,
              categories: revenueMapped.categories,
              series: [{ name: 'Doanh thu', data: revenueMapped.seriesData }],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          {/* Nút chọn khoảng thời gian cho đơn hàng */}
          <div>
            <Button
              variant={ordersTimeframe === 'day' ? 'contained' : 'outlined'}
              onClick={() => setOrdersTimeframe('day')}
            >
              Ngày
            </Button>
            <Button
              variant={ordersTimeframe === 'month' ? 'contained' : 'outlined'}
              onClick={() => setOrdersTimeframe('month')}
            >
              Tháng
            </Button>
            <Button
              variant={ordersTimeframe === 'year' ? 'contained' : 'outlined'}
              onClick={() => setOrdersTimeframe('year')}
            >
              Năm
            </Button>
          </div>

          <AnalyticsWebsiteVisits
            title="Đơn hàng theo thời gian"
            subheader={`(Hiển thị theo ${timeframeLabels[ordersTimeframe]})`}
            chart={{
              colors,
              categories: ordersMapped.categories,
              series: [{ name: 'Đơn hàng', data: ordersMapped.seriesData }],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
