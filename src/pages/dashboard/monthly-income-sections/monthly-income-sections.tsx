import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { useGetMonthlyTransactionQuery } from '../../../../modules/dasboard/api/dashboard.api';
import { MonthlyDashboardTransaction } from '../../../../modules/dasboard/dtos/models/entity';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../components/ui/chart';
import { Skeleton } from '../../../components/ui/skeleton'; // Add Skeleton import

export default function MonthlyIncomeSections() {
  const [chartData, setChartData] = useState<MonthlyDashboardTransaction[]>();

  const { data, isLoading } = useGetMonthlyTransactionQuery(null);

  const fetchData = useCallback(() => {
    if (data?.data) {
      setChartData(data.data);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartConfig = {
    views: {
      label: 'Page Views',
    },
    payment: {
      label: 'Income',
      color: '#2563eb',
    },
    expanses: {
      label: 'Expenses',
      color: '#60a5fa',
    },
  } satisfies ChartConfig;

  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('payment');

  const total = useMemo(
    () => ({
      expanses: chartData?.reduce((acc, curr) => acc + curr.expanses, 0) || 0,
      payment: chartData?.reduce((acc, curr) => acc + curr.payment, 0) || 0,
    }),
    [chartData],
  );

  return (
    <section>
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Monthly Transactions</CardTitle>
            <CardDescription>
              Showing amount of transactions per months
            </CardDescription>
          </div>

          <div className="flex">
            {['payment', 'expanses'].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  {isLoading ? (
                    <Skeleton className="h-6 w-20" /> // Show skeleton while loading
                  ) : (
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="px-2 sm:p-6">
          {isLoading ? (
            <Skeleton className="h-[250px] w-full" /> // Show skeleton chart while loading
          ) : (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        });
                      }}
                    />
                  }
                />
                <Line
                  dataKey={activeChart}
                  type="monotone"
                  stroke={`var(--color-${activeChart})`}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
