import TabsComponent from "@/lib/components/Tabs/Tabs";
import SettingsTabs from "@/lib/constants/SettingsConstants/SettingsConstants";

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col  gap-4 py-8 md:py-10">
      <TabsComponent tabsData={SettingsTabs}  />
      {children}
    </section>
  );
}
