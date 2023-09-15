import clsx from "clsx";
import { LucideIcon, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

type SidebarProps = {
  navigations: { title: string; path: string; icon: LucideIcon }[];
};

function Sidebar({ navigations }: SidebarProps) {
  const [display, setDisplay] = useState("w-0");
  const pathname = usePathname();

  const collaspe = () => {
    if (display == "w-0") {
      setDisplay("w-full");
    } else {
      setDisplay("w-0");
    }
  };

  return (
    <aside
      className={clsx(
        "transition-[width] max-w-[250px] relative z-10 ",
        display
      )}
    >
      <Button
        onClick={collaspe}
        className="right-[-20px] top-[15px] absolute translate-x-full rounded-md"
        size={"sm"}
        variant={"secondary"}
      >
        <Menu size={18} />
      </Button>

      <div className="flex flex-col h-screen max-w-lg py-6 rounded-tr-[50px] space-y-12 bg-background overflow-hidden">
        <header className="pl-8 pr-4">
          <h1 className="text-2xl font-bold">Logo</h1>
        </header>

        <div className="space-y-2 overflow-hidden">
          {navigations.map((navitem) => {
            const isActive = pathname.match(navitem.path);
            return (
              <Link
                key={navitem.title}
                href={navitem.path}
                className={clsx([
                  {
                    "bg-primary text-background font-bold": isActive,
                  },
                  {
                    "text-forground hover:bg-muted font-light": !isActive,
                  },
                  "text-xs flex items-center space-x-2 px-8 py-2 w-full",
                ])}
              >
                <navitem.icon size={18} className="text-inherit" />
                <span className="py-2">{navitem.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
