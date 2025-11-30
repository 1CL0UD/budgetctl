import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IconAdjustments,
  IconArrowsSort,
  IconCalendar,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
  IconDownload,
  IconLayoutGrid,
  IconLayoutList,
  IconListDetails,
  IconPlus,
  IconReceipt2,
  IconSearch,
  IconTag,
  IconTrash,
  IconUpload,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(core)/transactions")({
  component: TransactionsRoute,
});

const transactions = [
  {
    id: "txn-1201",
    description: "Groceries at Market Lane",
    category: "Groceries",
    type: "Expense",
    amount: "-$82.40",
    dateLabel: "Jan 6, 2025",
    account: "Chase Checking",
    status: "Cleared",
    tags: ["Household", "Weekly"],
    receipt: true,
  },
  {
    id: "txn-1202",
    description: "Payroll • Acme Corp",
    category: "Salary",
    type: "Income",
    amount: "+$3,850.00",
    dateLabel: "Jan 5, 2025",
    account: "Main Checking",
    status: "Settled",
    tags: ["Paycheck"],
    receipt: false,
  },
  {
    id: "txn-1203",
    description: "Electric bill • City Utilities",
    category: "Utilities",
    type: "Expense",
    amount: "-$124.18",
    dateLabel: "Jan 4, 2025",
    account: "Main Checking",
    status: "Pending",
    tags: ["Home"],
    receipt: false,
  },
  {
    id: "txn-1204",
    description: "Coffee with team",
    category: "Dining",
    type: "Expense",
    amount: "-$18.60",
    dateLabel: "Jan 3, 2025",
    account: "Venture Card",
    status: "Cleared",
    tags: ["Work", "Social"],
    receipt: false,
  },
  {
    id: "txn-1205",
    description: "Gym membership",
    category: "Health",
    type: "Expense",
    amount: "-$59.00",
    dateLabel: "Jan 2, 2025",
    account: "Venture Card",
    status: "Cleared",
    tags: ["Wellness"],
    receipt: false,
  },
  {
    id: "txn-1206",
    description: "Freelance design invoice",
    category: "Side Income",
    type: "Income",
    amount: "+$720.00",
    dateLabel: "Dec 30, 2024",
    account: "Business Checking",
    status: "Settled",
    tags: ["Design", "Client"],
    receipt: true,
  },
  {
    id: "txn-1207",
    description: "Flight to Austin",
    category: "Travel",
    type: "Expense",
    amount: "-$412.30",
    dateLabel: "Dec 28, 2024",
    account: "Venture Card",
    status: "Cleared",
    tags: ["Trip"],
    receipt: true,
  },
  {
    id: "txn-1208",
    description: "Rent • January",
    category: "Housing",
    type: "Expense",
    amount: "-$1,650.00",
    dateLabel: "Dec 27, 2024",
    account: "Main Checking",
    status: "Scheduled",
    tags: ["Home"],
    receipt: false,
  },
];

const categories = [
  "Groceries",
  "Dining",
  "Utilities",
  "Housing",
  "Travel",
  "Salary",
  "Side Income",
  "Health",
  "Education",
];

const appliedFilters = ["This month", "Cleared", "Under $500", "Dining"];

type TransactionRecord = (typeof transactions)[number];

function TransactionsRoute() {
  const [view, setView] = React.useState<"table" | "cards">("table");
  const [sort, setSort] = React.useState("date-desc");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading] = React.useState(false);

  const selectionCount = selectedIds.length;
  const allSelected = selectionCount === transactions.length;

  const handleToggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(allSelected ? [] : transactions.map((item) => item.id));
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 pt-6 lg:px-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Transactions
            </h1>
            <p className="text-muted-foreground">
              Monitor spending, apply filters, and edit entries without leaving
              this page.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm">
                  <IconAdjustments />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-md">
                <SheetHeader className="border-b pb-3">
                  <SheetTitle className="text-lg">Filters</SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    Narrow down your transaction list with quick presets or
                    detailed filters.
                  </p>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4">
                  <FiltersPanel
                    onClear={() => setIsFiltersOpen(false)}
                    idPrefix="mobile-filters"
                  />
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline" size="sm">
              <IconDownload />
              Export
            </Button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <IconPlus />
                  Add transaction
                </Button>
              </DialogTrigger>
              <TransactionModal />
            </Dialog>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {appliedFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1 rounded-full px-3 py-1"
            >
              {filter}
              <Button variant="ghost" size="icon-sm" className="h-6 w-6 p-0">
                <IconTrash className="size-3.5" />
                <span className="sr-only">Remove {filter}</span>
              </Button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Clear all
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="hidden w-[320px] shrink-0 lg:block">
          <FiltersPanel onClear={() => undefined} idPrefix="desktop-filters" />
        </aside>
        <section className="flex-1 space-y-4">
          <Card className="border bg-card/60 shadow-sm">
            <CardHeader className="gap-4 pb-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-72 max-w-full">
                    <Input
                      placeholder="Search descriptions, tags, or notes"
                      className="pl-9"
                    />
                    <IconSearch className="text-muted-foreground absolute left-3 top-2.5 size-4" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ToggleGroup
                    type="single"
                    value={view}
                    onValueChange={(value) =>
                      value && setView(value as typeof view)
                    }
                    spacing={0}
                    className="rounded-md border bg-muted/50 p-0.5"
                  >
                    <ToggleGroupItem value="table" aria-label="Table view">
                      <IconLayoutList />
                      <span className="hidden sm:inline">List</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="cards" aria-label="Card view">
                      <IconLayoutGrid />
                      <span className="hidden sm:inline">Cards</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-[180px]" size="sm">
                      <IconArrowsSort className="size-4" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Date • Newest</SelectItem>
                      <SelectItem value="date-asc">Date • Oldest</SelectItem>
                      <SelectItem value="amount-desc">Amount • High</SelectItem>
                      <SelectItem value="amount-asc">Amount • Low</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" className="hidden lg:flex">
                    <IconAdjustments />
                    Quick filters
                  </Button>
                </div>
              </div>
              {selectionCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/60 px-3 py-2 text-sm">
                  <span className="font-medium">{selectionCount} selected</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="h-8"
                  >
                    {allSelected ? "Clear selection" : "Select all"}
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <IconDownload className="size-4" />
                    Export selected
                  </Button>
                  <Button variant="destructive" size="sm" className="h-8">
                    <IconTrash className="size-4" />
                    Delete
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <LoadingState />
              ) : transactions.length === 0 ? (
                <Empty className="min-h-80">
                  <EmptyHeader>
                    <EmptyTitle>No transactions yet</EmptyTitle>
                    <CardDescription className="text-muted-foreground">
                      Import data or add your first transaction to get started.
                    </CardDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button size="sm">
                      <IconUpload />
                      Import CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <IconPlus />
                      Add manually
                    </Button>
                  </EmptyContent>
                </Empty>
              ) : (
                <>
                  {view === "cards" ? (
                    <TransactionCards
                      data={transactions}
                      selectedIds={selectedIds}
                      onToggleSelection={handleToggleSelection}
                      className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
                    />
                  ) : (
                    <>
                      <div className="hidden md:block">
                        <TransactionTable
                          data={transactions}
                          onToggleSelection={handleToggleSelection}
                          selectedIds={selectedIds}
                        />
                      </div>
                      <TransactionCards
                        data={transactions}
                        selectedIds={selectedIds}
                        onToggleSelection={handleToggleSelection}
                        className="grid gap-3 md:hidden"
                      />
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <PaginationControls />
        </section>
      </div>
    </div>
  );
}

function FiltersPanel({
  onClear,
  idPrefix = "filters",
}: {
  onClear: () => void;
  idPrefix?: string;
}) {
  const prefix = idPrefix ? `${idPrefix}-` : "";

  return (
    <Card className="sticky top-24 border bg-card/80 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Filters</CardTitle>
        <CardDescription>
          Stack filters to narrow down the table.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Date range</Label>
          <div className="grid grid-cols-3 gap-2">
            {["Today", "This week", "This month"].map((label) => (
              <Button
                key={label}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label
                htmlFor={`${prefix}from`}
                className="text-xs text-muted-foreground"
              >
                From
              </Label>
              <Input id={`${prefix}from`} type="date" />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor={`${prefix}to`}
                className="text-xs text-muted-foreground"
              >
                To
              </Label>
              <Input id={`${prefix}to`} type="date" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Categories</Label>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              Manage
            </Button>
          </div>
          <div className="relative">
            <Input placeholder="Find a category" className="pl-8" />
            <IconSearch className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm leading-tight hover:border-primary/60"
              >
                <Checkbox aria-label={`Filter by ${category}`} />
                <span className="truncate">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <ToggleGroup type="single" spacing={2} className="w-full">
            <ToggleGroupItem value="all" className="flex-1">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="income" className="flex-1">
              Income
            </ToggleGroupItem>
            <ToggleGroupItem value="expense" className="flex-1">
              Expense
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Amount range</Label>
            <span className="text-xs text-muted-foreground">Live preview</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Min" />
            <Input placeholder="Max" />
          </div>
          <div className="relative h-3 rounded-full bg-muted">
            <div className="absolute left-6 right-16 top-0 h-full rounded-full bg-primary/40" />
            <div className="absolute left-6 top-1/2 size-3 -translate-y-1/2 rounded-full border border-primary bg-primary" />
            <div className="absolute right-16 top-1/2 size-3 -translate-y-1/2 rounded-full border border-primary bg-primary" />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$2,000+</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Tags</Label>
          <div className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
            <Badge variant="secondary" className="rounded-full">
              Travel
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              Reimbursable
            </Badge>
            <Input
              placeholder="Add tag"
              className="h-8 flex-1 border-none px-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={onClear}>
          Reset filters
        </Button>
      </CardContent>
    </Card>
  );
}

function TransactionTable({
  data,
  selectedIds,
  onToggleSelection,
}: {
  data: TransactionRecord[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-muted/40 data-[state=selected]:bg-primary/5"
              data-state={selectedIds.includes(item.id) && "selected"}
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={() => onToggleSelection(item.id)}
                  aria-label={`Select transaction ${item.id}`}
                />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IconCalendar className="size-4" />
                  {item.dateLabel}
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.status}
              </TableCell>
              <TableCell className="text-right font-semibold">
                <span
                  className={
                    item.type === "Income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  }
                >
                  {item.amount}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {item.receipt && (
                    <Badge
                      variant="secondary"
                      className="h-7 rounded-full px-2 text-[11px]"
                    >
                      <IconReceipt2 className="mr-1 size-3.5" />
                      Receipt
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon-sm">
                    <IconDotsVertical />
                    <span className="sr-only">Open actions</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TransactionCards({
  data,
  selectedIds,
  onToggleSelection,
  className,
}: {
  data: TransactionRecord[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", className)}>
      {data.map((item) => (
        <Card key={item.id} className="border bg-card/70 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground">
                {item.dateLabel}
              </p>
              <CardTitle className="text-base leading-tight">
                {item.description}
              </CardTitle>
              <p className="text-muted-foreground text-sm">{item.account}</p>
            </div>
            <Checkbox
              checked={selectedIds.includes(item.id)}
              onCheckedChange={() => onToggleSelection(item.id)}
              aria-label={`Select transaction ${item.id}`}
            />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full">
                  {item.category}
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  {item.type}
                </Badge>
              </div>
              <div className="text-lg font-semibold">
                <span
                  className={
                    item.type === "Income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  }
                >
                  {item.amount}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <IconListDetails className="size-4" />
              <span>{item.status}</span>
              <Separator orientation="vertical" className="h-4" />
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  <IconTag className="mr-1 size-3.5" />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <IconAdjustments className="size-4" />
                Edit
              </Button>
              <div className="flex items-center gap-2">
                {item.receipt && (
                  <Badge variant="outline" className="rounded-full">
                    <IconReceipt2 className="mr-1 size-3.5" />
                    Receipt
                  </Badge>
                )}
                <Button variant="ghost" size="icon-sm">
                  <IconDotsVertical />
                  <span className="sr-only">Open actions</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-md" />
      ))}
    </div>
  );
}

function PaginationControls() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card/70 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>Showing 1-8 of 156</span>
        <Separator orientation="vertical" className="hidden h-4 sm:block" />
        <span>Page 1 of 20</span>
      </div>
      <div className="flex items-center gap-2">
        <Select defaultValue="10">
          <SelectTrigger className="w-[120px]" size="sm">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm">
            <IconChevronLeft />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" size="icon-sm">
            <IconChevronRight />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function TransactionModal() {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader className="gap-1">
        <DialogTitle>Add transaction</DialogTitle>
        <DialogDescription>
          Capture the basics now. Validation, data fetching, and submit logic
          will hook in later.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Type</Label>
              <ToggleGroup type="single" spacing={2} className="w-full">
                <ToggleGroupItem value="expense" className="flex-1">
                  Expense
                </ToggleGroupItem>
                <ToggleGroupItem value="income" className="flex-1">
                  Income
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="$0.00" />
              <p className="text-xs text-muted-foreground">
                We will add currency formatting later.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="What was this for?" />
            <p className="text-xs text-muted-foreground">
              Add a short note to keep things searchable.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
              <Badge variant="secondary" className="rounded-full">
                Travel
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Work
              </Badge>
              <Input
                placeholder="Add tag"
                className="h-8 flex-1 border-none px-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receipt">Receipt</Label>
            <label
              htmlFor="receipt"
              className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center hover:border-primary/60"
            >
              <IconUpload className="text-muted-foreground size-6" />
              <span className="text-sm font-medium">Upload or drag a file</span>
              <span className="text-xs text-muted-foreground">
                PDF, JPG, or PNG — up to 5MB
              </span>
            </label>
            <Input id="receipt" type="file" className="sr-only" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Select>
              <SelectTrigger id="account">
                <SelectValue placeholder="Choose account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="credit">Credit card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Add any context you will want to remember later."
              className="border-input bg-input/10 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors"
            />
          </div>
        </div>
      </div>
      <DialogFooter className="pt-2">
        <Button variant="outline">Cancel</Button>
        <Button>
          <IconChevronDown className="size-4 rotate-180" />
          Save transaction
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
