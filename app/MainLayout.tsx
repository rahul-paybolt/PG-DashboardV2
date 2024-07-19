import { Navbar } from "@/components/NavBar";
import { ReactNode } from "react";
import clsx from "clsx";
import { useNavbar } from "../components/NavBarContext";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isCollapsed, toggleNavbar } = useNavbar();
  console.log("isCollapsed", isCollapsed);

  return (
    <div className="flex max-h-screen transition-all">
      <Navbar isCollapsed={isCollapsed} toggleNavbar={toggleNavbar} />
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
