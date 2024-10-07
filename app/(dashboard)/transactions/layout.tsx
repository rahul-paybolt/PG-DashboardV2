import TabsComponent from "@/lib/components/Tabs/Tabs";
import TransactionsTabs from "@/lib/constants/TransactionTabs/TransactionsTabs";

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* <TabsComponent tabsData={TransactionsTabs} /> */}
      {children}
    </section>
  );
}
