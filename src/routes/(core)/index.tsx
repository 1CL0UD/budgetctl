import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}

const recentTransactions = [
  {
    id: "txn-01",
    date: "Jan 12",
    description: "Groceries • Market Lane",
    category: "Groceries",
    amount: -82.4,
    type: "expense",
  },
  {
    id: "txn-02",
    date: "Jan 11",
    description: "Payroll • Acme Corp",
    category: "Salary",
    amount: 3850,
    type: "income",
  },
  {
    id: "txn-03",
    date: "Jan 10",
    description: "Electric bill",
    category: "Utilities",
    amount: -124.18,
    type: "expense",
  },
  {
    id: "txn-04",
    date: "Jan 09",
    description: "Coffee with team",
    category: "Dining",
    amount: -18.6,
    type: "expense",
  },
  {
    id: "txn-05",
    date: "Jan 08",
    description: "Freelance invoice",
    category: "Side Income",
    amount: 720,
    type: "income",
  },
];

function RecentTransactions() {
  return (
    <div className="px-4 lg:px-6">
      <Card className="border bg-card/70 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Latest activity across your accounts.</CardDescription>
          </div>
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
            Updated just now
          </Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((txn) => (
                <TableRow key={txn.id} className="hover:bg-muted/40">
                  <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                  <TableCell className="font-medium">{txn.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">
                      {txn.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    <span
                      className={
                        txn.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive"
                      }
                    >
                      {txn.type === "income" ? "+" : "-"}
                      ${Math.abs(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
