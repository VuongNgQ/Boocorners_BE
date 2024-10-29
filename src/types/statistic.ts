type RevenueByTime = {
  month: number | null;
  year: number | null;
  day: number | null;
};

type OrdersByTime = {
  month: number | null;
  year: number | null;
  day: number | null;
};

type DashboardDetails = {
  totalRevenue: number;
  totalOrders: number;
  totalProductsSold: number;
  soldToCustomers: number;
  revenueByTime: RevenueByTime;
  ordersByTime: OrdersByTime;
};

export type AdminDashboardSummary = {
  code: number;
  message: string;
  lists: null | any[];
  details: DashboardDetails;
};
