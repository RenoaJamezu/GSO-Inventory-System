import PageHeader from "@/shared/components/ui/PageHeader";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <PageHeader
          eyebrow="Inventory"
          title="Inventory workspace"
          description="This is the page for your item list, stock counts, and filters. Add the table or cards here when you are ready to connect live inventory data."
        />
      </section>
    </div>
  );
}
