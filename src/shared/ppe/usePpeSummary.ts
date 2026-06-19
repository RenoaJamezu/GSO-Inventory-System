import { useEffect, useMemo, useState } from "react";
import { implementedPpeModules } from "./modules";
import type { BaseAssetItem, PpeSummaryRow } from "./types";

type ModuleSnapshot = {
  moduleKey: string;
  items: BaseAssetItem[];
  amountField: string;
  route: string;
  accountTitle: string;
};

export function usePpeSummary() {
  const [snapshots, setSnapshots] = useState<ModuleSnapshot[]>([]);

  useEffect(() => {
    void Promise.all(
      implementedPpeModules.map((module) => module.useStore.getState().load()),
    );

    const updateSnapshots = () => {
      setSnapshots(
        implementedPpeModules.map((module) => ({
          moduleKey: module.moduleKey,
          items: module.useStore.getState().items,
          amountField: String(module.amountField),
          route: module.route,
          accountTitle: module.labels.summaryTitle,
        })),
      );
    };

    updateSnapshots();

    const unsubscribers = implementedPpeModules.map((module) =>
      module.useStore.subscribe(updateSnapshots),
    );

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const summaryRows = useMemo<PpeSummaryRow[]>(
    () =>
      snapshots.map((snapshot, index) => ({
        id: index + 1,
        account_title: snapshot.accountTitle,
        book_value: "",
        per_inventory_report: snapshot.items.reduce(
          (sum, item) =>
            sum +
            Number(
              (item as unknown as Record<string, unknown>)[snapshot.amountField] ??
                0,
            ),
          0,
        ),
        variance: "",
        route: snapshot.route,
      })),
    [snapshots],
  );

  const totalRecords = snapshots.reduce(
    (sum, snapshot) => sum + snapshot.items.length,
    0,
  );
  const totalAmount = summaryRows.reduce(
    (sum, row) => sum + row.per_inventory_report,
    0,
  );

  return {
    summaryRows,
    totalRecords,
    totalAmount,
  };
}
