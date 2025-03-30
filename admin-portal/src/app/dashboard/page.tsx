import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { Sales } from '@/components/dashboard/overview/sales';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalPosts } from '@/components/dashboard/overview/total-posts';
import { TotalReports } from '@/components/dashboard/overview/total-reports';

import { fetchData } from './api';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;
export interface DashboardData {
  usersCount: number;
  subscribedUsersCount: number;
  usersCreatedLast30DaysCount: number;
  trend: 'up' | 'down';
  increaseOrDecreasePercentage: string;
  postsCount: number;
  postsCreatedLast30DaysCount: number;
  trendPosts: 'up' | 'down';
  increaseOrDecreasePercentagePosts: string;
  pendingPostsCount: number;
  reportsCount: number;
  reportsCreatedLast30DaysCount: number;
  trendReports: 'up' | 'down';
  increaseOrDecreasePercentageReports: string;
  pendingReportsCount: number;
  totalAvailableBalance: number;
  totalPendingBalance: number;
  paymentSubscriptionsCount: number;
  postsYearByYear: { name: string; data: number[] }[];
}

export default async function Page(): Promise<React.JSX.Element> {
  const dashboardData: DashboardData = (await fetchData()) as DashboardData;

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers
          diff={dashboardData.increaseOrDecreasePercentage}
          trend={dashboardData.trend}
          sx={{ height: '100%' }}
          usersCount={dashboardData.usersCount}
          subscribedUsersCount={dashboardData.subscribedUsersCount}
          usersCreatedLast30DaysCount={dashboardData.usersCreatedLast30DaysCount}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalPosts
          diff={dashboardData.increaseOrDecreasePercentagePosts}
          trend={dashboardData.trendPosts}
          sx={{ height: '100%' }}
          postsCount={dashboardData.postsCount}
          postsCreatedLast30DaysCount={dashboardData.postsCreatedLast30DaysCount}
          pendingPostsCount={dashboardData.pendingPostsCount}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalReports
          diff={dashboardData.increaseOrDecreasePercentageReports}
          trend={dashboardData.trendReports}
          sx={{ height: '100%' }}
          reportsCount={dashboardData.reportsCount}
          reportsCreatedLast30DaysCount={dashboardData.reportsCreatedLast30DaysCount}
          pendingReportsCount={dashboardData.pendingReportsCount}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Budget
          sx={{ height: '100%' }}
          paymentSubscriptionsCount={dashboardData.paymentSubscriptionsCount}
          totalPendingBalance={dashboardData.totalPendingBalance}
          totalAvailableBalance={dashboardData.totalAvailableBalance}
        />
      </Grid>
      <Grid lg={12} xs={12}>
        <Sales chartSeries={dashboardData.postsYearByYear} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
