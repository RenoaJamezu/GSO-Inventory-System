import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/shared/components/ui/PageHeader";
import SearchInput from "@/shared/components/ui/SearchInput";
import Table, { type Column } from "@/shared/components/ui/Table";
import StatCard from "@/shared/components/ui/StatCard";
import { usePpeSummary } from "@/shared/ppe/usePpeSummary";
import type { PpeSummaryRow } from "@/shared/ppe/types";

export default function PpeSummaryPage() {
  const { summaryRows, totalAmount } = usePpeSummary();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return summaryRows;

    return summaryRows.filter((row) =>
      row.account_title.toLowerCase().includes(query),
    );
  }, [search, summaryRows]);

  const columns: Column<PpeSummaryRow>[] = [
    { header: "NO", key: "id" },
    { header: "ACCOUNT TITLE", key: "account_title" },
    { header: "BOOK VALUE", key: "book_value" },
    {
      header: "PER INVENTORY REPORT",
      key: "per_inventory_report",
      render: (value) => Number(value).toLocaleString(),
    },
    { header: "VARIANCE", key: "variance" },
  ];

  return (
    <div className="flex h-screen flex-col gap-6 overflow-hidden">
      <PageHeader
        eyebrow="property plant and equipments"
        title="PPE Summary workspace"
        description="View the summary of PPE records"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Account Title" value={summaryRows.length} />
        <StatCard label="Total Amount" value={totalAmount.toLocaleString()} />
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by account title..."
      />

      <div className="min-h-0 flex-1">
        <Table<PpeSummaryRow>
          columns={columns}
          data={filteredRows}
          getRowKey={(row) => row.id}
          emptyMessage="No PPE records yet."
          onRowClick={(row) => {
            console.log(row.route);
            navigate(row.route);
          }}
        />
      </div>
    </div>
  );
}
