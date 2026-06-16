import PageHeader from "@/shared/components/ui/PageHeader";

export default function HomePage() {
  return (
    <section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <PageHeader
        eyebrow="Home"
        title="Welcome back"
        description="Use this screen as the landing page for the inventory workspace. The sidebar buttons switch the main content without leaving the layout."
      />
    </section>
  );
}
