import { useLandPage } from "@/features/land/hooks/useLandPage";
import PageHeader from "@/shared/components/ui/PageHeader";
import SearchInput from "@/shared/components/ui/SearchInput";
import SummaryCardProps from "@/shared/components/ui/SummaryCard";
import Table from "@/shared/components/ui/Table";
import { useState } from "react";
import { ppeColumns } from "../components/ppeColumns";
import { useNavigate } from "react-router-dom";

export default function PpeSummaryPage() {
  const { stats } = useLandPage();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const totalAmount = stats.totalCarryingAmount;

  const ppeData = [
    {
      id: 1,
      account_title: "Land",
      book_value: "",
      per_inventory_report: stats.totalCarryingAmount,
      variance: "",
      route: "/ppe/land",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <PageHeader
          eyebrow="property plant and equipments"
          title="PPE Summary workspace"
        />

        <SummaryCardProps
          totalDataLabel="total account title"
          totalData={1}
          totalAmountLabel="per inventory report"
          totalAmount={totalAmount}
        />

        <div className="mt-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by account title..."
          />
        </div>

        <div className="mt-8 min-h-0 flex-1 overflow-y-auto simple-scrollbar pr-1">
          <Table
            columns={ppeColumns}
            data={ppeData}
            getRowKey={(row) => row.id}
            emptyMessage="No land records yet. Add the first entry using the button above."
            onRowClick={(row) => navigate(row.route)}
          />
        </div>
      </section>
    </div>
  );
}
