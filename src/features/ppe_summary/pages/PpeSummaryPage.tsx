import { useLandPage } from "@/features/land/hooks/useLandPage";
import PageHeader from "@/shared/components/ui/PageHeader";
import SearchInput from "@/shared/components/ui/SearchInput";
import Table from "@/shared/components/ui/Table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOtherLandPage } from "@/features/other_land/hooks/useOtherLandPage";
import StatCard from "@/shared/components/ui/StatCard";
import { useRoadNetworkPage } from "@/features/road_network/useRoadNetworkPage";

export default function PpeSummaryPage() {
  const { stats: landStat } = useLandPage();
  const { stats: otherLandStat } = useOtherLandPage();
  const { stats: roadNetworkStat} = useRoadNetworkPage();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const totalAmount =
    landStat.totalCarryingAmount + otherLandStat.totalCarryingAmount + roadNetworkStat.totalCost;

  const columns = [
    { header: "NO", key: "id" },
    { header: "ACCOUNT TITLE", key: "account_title" },
    { header: "BOOK VALUE", key: "book_value" },
    {
      header: "PER INVENTORY REPORT",
      key: "per_inventory_report",
      render: (value: number) => value.toLocaleString(),
    },
    { header: "VARIANCE", key: "variance" },
  ] as const;

  const ppeData = [
    {
      id: 1,
      account_title: "Land",
      book_value: "",
      per_inventory_report: landStat.totalCarryingAmount,
      variance: "",
      route: "/ppe/land",
    },
    {
      id: 2,
      account_title: "Other Land Improvements",
      book_value: "",
      per_inventory_report: otherLandStat.totalCarryingAmount,
      variance: "",
      route: "/ppe/other-land-improvement",
    },
    {
      id: 3,
      account_title: "Road Networks",
      book_value: "",
      per_inventory_report: roadNetworkStat.totalCost,
      variance: "",
      route: "/ppe/road-network",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="property plant and equipments"
        title="PPE Summary workspace"
        description="View the summary of PPE records"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Records" value={2} />
        <StatCard label="Total Amount" value={totalAmount.toLocaleString()} />
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by account title..."
      />

      <div className="flex-1 overflow-y-auto simple-scrollbar">
        <Table
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={columns as any}
          data={ppeData}
          getRowKey={(row) => row.id}
          emptyMessage="No land records yet. Add the first entry using the button above."
          onRowClick={(row) => navigate(row.route)}
        />
      </div>
    </div>
  );
}
