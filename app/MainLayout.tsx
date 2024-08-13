import { ReactNode } from "react";
import clsx from "clsx";
import { useNavbar } from "../components/NavBarContext";
import { Sidebar } from "@/components/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isCollapsed, toggleNavbar } = useNavbar();

  return (
    <div className="flex max-h-screen transition-all">
      <Sidebar isCollapsed={isCollapsed} toggleNavbar={toggleNavbar} />
      <div
        className={clsx(
          "flex-1 transition-all duration-300",
          isCollapsed ? "ml-[250px]" : "ml-[70px]"
        )}
      >
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
