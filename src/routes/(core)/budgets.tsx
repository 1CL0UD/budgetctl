import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IconAlertTriangle,
  IconCalendar,
  IconChartBar,
  IconDotsVertical,
  IconEdit,
  IconPigMoney,
  IconPlus,
  IconTrendingUp,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(core)/budgets")({
  component: BudgetsRoute,
});

const budgets = [
  {
    id: "budget-1",
    category: "Groceries",
    spent: 420,
    limit: 600,
    daysLeft: 9,
    status: "on-track" as const,
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    id: "budget-2",
    category: "Dining Out",
    spent: 230,
    limit: 300,
    daysLeft: 9,
    status: "warning" as const,
    accent: "from-amber-300 to-orange-500",
  },
  {
    id: "budget-3",
    category: "Travel",
    spent: 950,
    limit: 900,
    daysLeft: 20,
    status: "over" as const,
    accent: "from-rose-400 to-red-600",
  },
  {
    id: "budget-4",
    category: "Housing",
    spent: 1650,
    limit: 1800,
    daysLeft: 9,
    status: "on-track" as const,
    accent: "from-indigo-400 to-indigo-600",
  },
];

function BudgetsRoute() {
  return (
    <div className="flex flex-col gap-6 px-4 pb-10 pt-6 lg:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Track spending caps, monitor status, and adjust limits without leaving this screen.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[160px]" size="sm">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <IconPlus />
                Add budget
              </Button>
            </DialogTrigger>
            <BudgetModal />
          </Dialog>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
        <Card className="border-dashed bg-card/60">
          <CardContent className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="flex items-center justify-center rounded-full bg-muted p-3">
              <IconPlus className="size-5" />
            </div>
            <div>
              <p className="font-semibold">Create a new budget</p>
              <p className="text-muted-foreground text-sm">
                Group transactions and set spending caps for categories.
              </p>
            </div>
            <Button variant="outline" size="sm">
              New budget
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function BudgetCard({
  budget,
}: {
  budget: (typeof budgets)[number];
}) {
  const percent = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
  const statusLabel =
    budget.status === "on-track"
      ? "On track"
      : budget.status === "warning"
        ? "Close to limit"
        : "Over budget";

  return (
    <Card className="border bg-card/70 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              <IconChartBar className="size-4" />
              {budget.category}
            </Badge>
            <StatusBadge status={budget.status} label={statusLabel} />
          </div>
          <CardTitle className="text-lg leading-tight">
            ${budget.spent.toLocaleString()} of ${budget.limit.toLocaleString()}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm">
            <IconCalendar className="size-4" />
            {budget.daysLeft} days left in period
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon-sm">
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-2.5 rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full bg-gradient-to-r",
              budget.accent,
              percent > 100 && "bg-destructive"
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconTrendingUp className="size-4" />
            <span>{percent}% used</span>
          </div>
          <span>${Math.max(0, budget.limit - budget.spent).toLocaleString()} remaining</span>
        </div>
        <Separator />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="rounded-full">
            <IconPigMoney className="size-4" />
            Auto-transfer on
          </Badge>
          <span>Alerts enabled</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start sm:flex-1">
                <IconEdit className="size-4" />
                Edit budget
              </Button>
            </DialogTrigger>
            <BudgetModal />
          </Dialog>
          <Button variant="outline" size="sm" className="w-full justify-start sm:flex-1">
            Add transaction
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status, label }: { status: "on-track" | "warning" | "over"; label: string }) {
  const tone =
    status === "on-track"
      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
      : status === "warning"
        ? "bg-amber-500/15 text-amber-600 dark:text-amber-300"
        : "bg-red-500/15 text-red-600 dark:text-red-300";

  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", tone)}>
      {label}
    </span>
  );
}

function BudgetModal() {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Budget settings</DialogTitle>
        <DialogDescription>
          Define the basics now—period, limit, alerts. Hook validation and persistence later.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budget-category">Category</Label>
          <Select>
            <SelectTrigger id="budget-category">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget.id} value={budget.category}>
                  {budget.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget-name">Budget name</Label>
          <Input id="budget-name" placeholder="e.g., Q1 Dining Cap" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget-amount">Limit</Label>
          <Input id="budget-amount" placeholder="$1,000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget-period">Period</Label>
          <Select>
            <SelectTrigger id="budget-period">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget-start">Start date</Label>
          <Input id="budget-start" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget-alerts">Notifications</Label>
          <Select>
            <SelectTrigger id="budget-alerts">
              <SelectValue placeholder="Enable alerts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on">On</SelectItem>
              <SelectItem value="off">Off</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="budget-notes">Notes</Label>
          <textarea
            id="budget-notes"
            rows={3}
            placeholder="Add details or rules for this budget."
            className="border-input bg-input/10 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors"
          />
        </div>
      </div>
      <DialogFooter className="pt-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save budget</Button>
      </DialogFooter>
    </DialogContent>
  );
}
