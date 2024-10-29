import type { AdminDashboardSummary } from 'src/types/statistic';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetStatistic() {
  const url = endpoints.statistic.detail;

  const { data, isLoading, error, isValidating } = useSWR<AdminDashboardSummary>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      statistic: data?.details || null,
      statisticLoading: isLoading,
      statisticError: error,
      statisticValidating: isValidating,
    }),
    [data?.details, error, isLoading, isValidating]
  );

  return memoizedValue;
}
