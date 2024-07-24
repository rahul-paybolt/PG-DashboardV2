import TabsComponent from "@/components/Tabs/Tabs";
import TransactionsTabs from "@/constants/TransactionTabs/TransactionsTabs";

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col  gap-4 py-8 md:py-10">
      <TabsComponent tabsData={TransactionsTabs}/>
        {children}
    </section>
  );
}
