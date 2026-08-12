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
    <div className="min-h-screen bg-ink lg:flex">
      <AdminSidebar />

      <section className="min-w-0 flex-1 px-4 pb-10 pt-24 sm:px-6 md:px-12 md:pb-14 md:pt-28 lg:px-12 lg:py-14">
        <p className="eyebrow mb-3">
          {eyebrow}
        </p>

        <h1 className="mb-8 font-display text-3xl leading-[0.95] text-bone sm:text-4xl md:mb-10 md:text-5xl">
          {title}
        </h1>

        {children}
      </section>
    </div>
  );
}