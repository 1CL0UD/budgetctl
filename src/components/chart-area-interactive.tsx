"use client"

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "Spending vs income trend";

const chartData = [
  { date: "2024-09-01", expenses: 180, income: 420 },
  { date: "2024-09-08", expenses: 240, income: 430 },
  { date: "2024-09-15", expenses: 260, income: 425 },
  { date: "2024-09-22", expenses: 310, income: 420 },
  { date: "2024-09-29", expenses: 280, income: 440 },
  { date: "2024-10-06", expenses: 300, income: 450 },
  { date: "2024-10-13", expenses: 340, income: 440 },
  { date: "2024-10-20", expenses: 320, income: 450 },
  { date: "2024-10-27", expenses: 360, income: 455 },
  { date: "2024-11-03", expenses: 310, income: 460 },
  { date: "2024-11-10", expenses: 330, income: 455 },
  { date: "2024-11-17", expenses: 350, income: 470 },
  { date: "2024-11-24", expenses: 370, income: 465 },
  { date: "2024-12-01", expenses: 390, income: 475 },
  { date: "2024-12-08", expenses: 410, income: 480 },
  { date: "2024-12-15", expenses: 430, income: 485 },
  { date: "2024-12-22", expenses: 460, income: 490 },
  { date: "2024-12-29", expenses: 480, income: 495 },
  { date: "2025-01-05", expenses: 410, income: 500 },
  { date: "2025-01-12", expenses: 420, income: 505 },
  { date: "2025-01-19", expenses: 450, income: 510 },
  { date: "2025-01-26", expenses: 430, income: 515 },
  { date: "2025-02-02", expenses: 440, income: 520 },
  { date: "2025-02-09", expenses: 470, income: 525 },
  { date: "2025-02-16", expenses: 460, income: 530 },
  { date: "2025-02-23", expenses: 490, income: 535 },
  { date: "2025-03-02", expenses: 510, income: 540 },
  { date: "2025-03-09", expenses: 480, income: 545 },
  { date: "2025-03-16", expenses: 470, income: 550 },
  { date: "2025-03-23", expenses: 500, income: 555 },
  { date: "2025-03-30", expenses: 520, income: 560 },
];

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "var(--chart-3)",
  },
  income: {
    label: "Income",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2025-03-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Spending vs income</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Trailing trend by week
          </span>
          <span className="@[540px]/card:hidden">Recent trend</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px]">
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 0,
              right: 10,
            }}
          >
            <defs>
              <linearGradient id="fillExpenses" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillIncome" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#fillExpenses)"
              stroke="var(--color-expenses)"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
