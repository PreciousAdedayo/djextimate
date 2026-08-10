import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminShell({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink lg:flex-row">
      <AdminSidebar />
      <section className="flex-1 px-6 py-10 md:px-12 md:py-14">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="mb-10 font-display text-4xl leading-[0.95] text-bone md:text-5xl">{title}</h1>
        {children}
      </section>
    </div>
  );
}
