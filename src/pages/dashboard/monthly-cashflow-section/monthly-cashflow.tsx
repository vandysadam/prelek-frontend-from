// Sesuaikan jalur impor

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, XAxis, Bar, BarChart } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../../components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../components/ui/chart';

const chartConfigs2 = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
};

const chartDatas2 = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

export default function BarChartMultipleSection() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigs2}>
            <BarChart accessibilityLayer data={chartDatas2}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}

// const chartConfigs2 = {
//   desktop: {
//     label: 'Desktop',
//     color: 'hsl(var(--chart-1))',
//   },
//   mobile: {
//     label: 'Mobile',
//     color: 'hsl(var(--chart-2))',
//   },
// } satisfies ChartConfig;

// const chartDatas2 = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 },
// ];

// <div className="flex justify-between">
//   <Card>
//     <CardHeader>
//       <CardTitle>Bar Chart - Multiple</CardTitle>
//       <CardDescription>January - June 2024</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <ChartContainer config={chartConfigs2}>
//         <BarChart accessibilityLayer data={chartDatas2}>
//           <CartesianGrid vertical={false} />
//           <XAxis
//             dataKey="month"
//             tickLine={false}
//             tickMargin={10}
//             axisLine={false}
//             tickFormatter={(value) => value.slice(0, 3)}
//           />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent indicator="dashed" />}
//           />
//           <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
//           <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
//         </BarChart>
//       </ChartContainer>
//     </CardContent>
//     <CardFooter className="flex-col items-start gap-2 text-sm">
//       <div className="flex gap-2 font-medium leading-none">
//         Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//       </div>
//       <div className="leading-none text-muted-foreground">
//         Showing total visitors for the last 6 months
//       </div>
//     </CardFooter>
//   </Card>

//   <Card>
//     <CardHeader>
//       <CardTitle>Bar Chart - Custom Label</CardTitle>
//       <CardDescription>January - June 2024</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <ChartContainer config={chartConfigs3}>
//         <BarChart
//           accessibilityLayer
//           data={chartDatas3}
//           layout="vertical"
//           margin={{
//             right: 16,
//           }}
//         >
//           <CartesianGrid horizontal={false} />
//           <YAxis
//             dataKey="month"
//             type="category"
//             tickLine={false}
//             tickMargin={10}
//             axisLine={false}
//             tickFormatter={(value) => value.slice(0, 3)}
//             hide
//           />
//           <XAxis dataKey="desktop" type="number" hide />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent indicator="line" />}
//           />
//           <Bar
//             dataKey="desktop"
//             layout="vertical"
//             fill="var(--color-desktop)"
//             radius={4}
//           >
//             <LabelList
//               dataKey="month"
//               position="insideLeft"
//               offset={8}
//               className="fill-[--color-label]"
//               fontSize={12}
//             />
//             <LabelList
//               dataKey="desktop"
//               position="right"
//               offset={8}
//               className="fill-foreground"
//               fontSize={12}
//             />
//           </Bar>
//         </BarChart>
//       </ChartContainer>
//     </CardContent>
//     <CardFooter className="flex-col items-start gap-2 text-sm">
//       <div className="flex gap-2 font-medium leading-none">
//         Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//       </div>
//       <div className="leading-none text-muted-foreground">
//         Showing total visitors for the last 6 months
//       </div>
//     </CardFooter>
//   </Card>
// </div>;
