export interface SettingsTabsProps {
    id: string;
    label: string;
    value: string;
  }
  const SettingsTabs: SettingsTabsProps[] = [
    {
      id: "/settings/profile",
      label: "Profile",
      value: "/profile",
    },
    {
      id: "/settings/security",
      label: "Security",
      value: "/security",
    },  
    {
      id: "/settings/developer",
      label: "Developer",
      value: "/developer",
    },
    {
      id: "/settings/pricing",
      label: "Billing",
      value: "/pricing",
    },
    {
      id: "/settings/api-reference",
      label: "API Reference",
      value: "/api-reference",
    },
  ];
  
  export default SettingsTabs;
  