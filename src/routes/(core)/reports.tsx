import { createFileRoute } from "@tanstack/react-router";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCalendar,
  IconChartBar,
  IconChartPie,
  IconDownload,
  IconListDetails,
  IconShare3,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/(core)/reports")({
  component: ReportsRoute,
});

const summaryCards = [
  {
    id: "income",
    title: "Total income",
    value: "$12,450",
    delta: "+8.4%",
    trend: "up",
  },
  {
    id: "expenses",
    title: "Total expenses",
    value: "$8,920",
    delta: "-2.1%",
    trend: "down",
  },
  {
    id: "net",
    title: "Net savings",
    value: "$3,530",
    delta: "+4.5%",
    trend: "up",
  },
  {
    id: "rate",
    title: "Savings rate",
    value: "28.4%",
    delta: "+1.2%",
    trend: "up",
  },
];

const topExpenses = [
  { id: 1, name: "Rent", amount: "$1,650", share: "18%" },
  { id: 2, name: "Groceries", amount: "$820", share: "9%" },
  { id: 3, name: "Dining Out", amount: "$560", share: "6%" },
  { id: 4, name: "Travel", amount: "$510", share: "5%" },
];

function ReportsRoute() {
  return (
    <div className="flex flex-col gap-6 px-4 pb-10 pt-6 lg:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Visualize spending, category trends, and income vs. expenses at a
            glance.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[170px]" size="sm">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <IconDownload />
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <IconShare3 />
            Share
          </Button>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.id} className="border bg-card/70 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                {card.title}
              </CardDescription>
              <CardTitle className="text-2xl">{card.value}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
              {card.trend === "up" ? (
                <Badge
                  variant="secondary"
                  className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                >
                  <IconArrowUpRight className="size-4" />
                  {card.delta}
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="rounded-full bg-red-500/15 text-red-600 dark:text-red-300"
                >
                  <IconArrowDownRight className="size-4" />
                  {card.delta}
                </Badge>
              )}
              vs previous period
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border bg-card/70 shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">Spending over time</CardTitle>
              <CardDescription>Track trends and seasonality.</CardDescription>
            </div>
            <Badge variant="secondary" className="rounded-full">
              <IconCalendar className="size-4" />
              Jan – Mar
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <ChartPlaceholder />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <IconChartBar className="size-4" />
              Hover and click interactions will be wired to live data later.
            </div>
          </CardContent>
        </Card>
        <Card className="border bg-card/70 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">Spending by category</CardTitle>
              <CardDescription>
                Top categories and their shares.
              </CardDescription>
            </div>
            <Badge variant="outline" className="rounded-full">
              <IconChartPie className="size-4" />
              Donut
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartPlaceholder />
            <div className="space-y-2 text-sm">
              {["Housing", "Groceries", "Dining", "Travel"].map(
                (category, idx) => (
                  <div
                    key={category}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-primary" />
                      <span>{category}</span>
                    </div>
                    <span className="font-semibold">{15 - idx * 2}%</span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border bg-card/70 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">Income vs Expenses</CardTitle>
              <CardDescription>Stacked comparison.</CardDescription>
            </div>
            <Badge variant="secondary" className="rounded-full">
              <IconListDetails className="size-4" />
              Overview
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <ChartPlaceholder />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border px-3 py-2">
                <p className="text-muted-foreground text-xs uppercase">
                  Income
                </p>
                <p className="text-lg font-semibold text-emerald-500">
                  $12,450
                </p>
              </div>
              <div className="rounded-md border px-3 py-2">
                <p className="text-muted-foreground text-xs uppercase">
                  Expenses
                </p>
                <p className="text-lg font-semibold text-destructive">$8,920</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border bg-card/70 shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">Top expenses</CardTitle>
              <CardDescription>Largest outflows this period.</CardDescription>
            </div>
            <Select defaultValue="month">
              <SelectTrigger className="w-[140px]" size="sm">
                <SelectValue placeholder="Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="quarter">This quarter</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-2">
              {topExpenses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-2.5 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Share: {item.share}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">{item.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border bg-card/70 shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">Budget performance</CardTitle>
              <CardDescription>Compare planned vs. actual.</CardDescription>
            </div>
            <Badge variant="outline" className="rounded-full">
              <IconChartBar className="size-4" />
              Variance
            </Badge>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder className="h-64" />
          </CardContent>
        </Card>
        <Card className="border bg-card/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Export report</CardTitle>
            <CardDescription>
              Choose format and email recipients.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="report-format">Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-email">Email</Label>
              <Input id="report-email" placeholder="name@company.com" />
            </div>
            <Button className="w-full">
              <IconDownload />
              Generate report
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ChartPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`border-border/70 bg-linear-to-br from-muted/70 via-muted/40 to-muted/70 relative h-64 w-full rounded-lg border border-dashed ${
        className ?? ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-muted-foreground text-sm">
        Chart placeholder
      </div>
    </div>
  );
}
