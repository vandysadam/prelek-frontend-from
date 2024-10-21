// pages/Dashboard.tsx

import { Label, Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../components/ui/chart';
import { useGetPieChartQuery } from '../../../../modules/users/api/user.api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PieChartOne } from '../../../../modules/dasboard/dtos/models/entity';
import { Combobox } from '../statistic-sections/component/dropdown-component';

// transaksi yang akan ditampilkan adalah
// 1. transaksi expanses
// 2. transaksi subscription income
// 3. transaksi subscription payment
// 4. transaksi top-up
// tambah input pemasukan

const chartConfigs = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: '',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function AllCashflowSections() {
  const [chartData, setChartData] = useState<PieChartOne[]>();
  const startYear = 2001;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: Math.min(5, currentYear - startYear + 1) },
    (_, i) => currentYear - i,
  ).map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const chartMappedData = useMemo(() => {
    return chartData
      ?.map((item) => [
        { name: 'Expanses', value: item.expanses, fill: 'var(--color-safari)' },
        {
          name: 'Subscription Income',
          value: item.subscriptionincome,
          fill: 'var(--color-firefox)',
        },
        {
          name: 'Subscription Payment',
          value: item.subscriptionpayment,
          fill: 'var(--color-edge)',
        },
      ])
      .flat();
  }, [chartData]);

  const totalVisitors = useMemo(
    () => ({
      expanses: chartData?.reduce((acc, curr) => acc + curr.expanses, 0) || 0,
      subscriptionincome:
        chartData?.reduce((acc, curr) => acc + curr.subscriptionincome, 0) || 0,
      subscriptionpayment:
        chartData?.reduce((acc, curr) => acc + curr.subscriptionpayment, 0) ||
        0,
    }),
    [chartData],
  );
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const { data } = useGetPieChartQuery(selectedYear);
  const fetchData = useCallback(() => {
    if (data?.data) {
      setChartData(data.data);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedYear]);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>
          <h6>Select years...</h6>
          <Combobox
            items={years}
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Select years..."
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfigs}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartMappedData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.expanses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Top Up
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total transactions for the year
        </div>
      </CardFooter>
    </Card>
  );
}
