export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10 w-full">
      <div>
        {children}
      </div>
     </section>
  );
}
